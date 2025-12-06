import Order from "../models/Order.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


/* 
    Create a Checkout Session for an orderId
    We calculate amounts (Stipe will use integer cents USD)
*/


export const createCheckoutSession = async (req , res) => {

    try {
        const { orderId } = req.body
        if (!orderId) return res.status(400).json({message : "Order Id is required"})

        // Find order and populate products
        const order = await Order.findById(orderId).populate("orderItems.product" , "name")    

        if (!order) return res.status(404).json({message : "Order not found"})

        const items = order.orderItems.map((item) => ({
            price_data : {
                currency : process.env.CURRENCY ,
                product_data : {
                    name : item.product.name || "Product"
                },
                unit_amount : item.price * 100 // convert to cents
            },
            quantity : item.quantity
        }))

        // Create session
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            items,
            mode : "payment",
            success_url : `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&orderId=${order._id}`,
            cancel_url : `${process.env.FRONTEND_URL}/payment-cancelled`,
            metadata : {
                orderId : order._id.toString() // helpful in Webhook
            }
        })
         // return the session url & id
        res.json({url : session.url , id : session.id})
    } catch (error) {
        res.status(500).json({message : "Server error" , details : error.message})
    }
}
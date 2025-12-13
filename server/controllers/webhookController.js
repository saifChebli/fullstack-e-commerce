import Order from "../models/Order.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)




export const stripeWebhook = async (req , res) => {
    const signature = req.headers["stripe-signature"]

    let paymentEvent
    try {
        // req.rawBody : provided by our webhook route 
        paymentEvent = stripe.webhooks.constructEvent(req.rawBody , signature , process.env.WEBHOOK_SECRET)
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Webhook Error"})
    }

    // Handle the checkout session 
    if (paymentEvent.type === "checkout.session.completed"){
        const session = paymentEvent.data.object
        const orderId = session.metadata.orderId

        try {
            if(orderId){
                const order = await Order.findById(orderId)
                if(order && !order.isPaid){
                    order.isPaid = true
                    order.paidAt = new Date()
                    order.paymentResult = {
                        id : session.id,
                        status : session.payment_status,
                        update_time : new Date(),
                        email_address : session.customer_details.email || ""
                    }
                    order.status = "paid"
                    await order.save()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    res.status(200).json({ received : true })
}
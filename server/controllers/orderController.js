import Order from "../models/Order.js"





// Create an order (user)

export const createOrder = async (req,res) => {

    const { totalPrice , orderItems } = req.body
    try {
        
        if (!orderItems || orderItems.length === 0){
            return res.status(400).json({message : "No order Items"})
        }

        const order = await Order.create({
            user : req.user.id,
            totalPrice,
            orderItems
        })

        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}

// Get All orders By user (user)

export const getUserOrders = async (req,res) => {
    try {
        const orders = await Order.find({user : req.user.id})
        .populate("orderItems.product" , "name price image")

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}

// Get all orders (admin)

export const getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find()
        .populate("user" , "name email")
        .populate("orderItems.product" , "name price image").sort("-createdAt")

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}


// Update order status (admin)


export const updateOrderStatus = async (req,res) => {

    const { orderId } = req.params
    const { status } = req.body

    try {
        const order = await Order.findById(orderId)
        if (!order) return res.status(404).json({message : "Order not found"})

        if (status) order.status = status
        await order.save()
        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}
import express from 'express'
import { createOrder, getAllOrders, getUserOrders, updateOrderStatus } from '../controllers/orderController.js'
import { access } from '../middlewares/authMidlleware.js'
import { authorize } from '../middlewares/roleMiddleware.js'

const router = express.Router()


// Admin Routes
router.get("/all-orders" , access , authorize("admin") , getAllOrders)
router.put("/update-status/:orderId" , access , authorize("admin") , updateOrderStatus)

// User Routes
router.get("/get-orders" , access , getUserOrders)
router.post("/add-order" , access , createOrder)







export default router
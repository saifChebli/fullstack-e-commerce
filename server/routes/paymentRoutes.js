import express from 'express'
import { createCheckoutSession } from '../controllers/paymentController.js'
import { access } from '../middlewares/authMidlleware.js'



const router = express.Router()


router.post("/create-checkout-session" , access, createCheckoutSession)









export default router
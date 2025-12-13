import express from 'express'
import { createCheckoutSession } from '../controllers/paymentController.js'
import { access } from '../middlewares/authMidlleware.js'
import bodyParser from 'body-parser'
import { stripeWebhook } from '../controllers/webhookController.js'


const router = express.Router()


router.post("/create-checkout-session" , access, createCheckoutSession)





router.post("/webhook" , bodyParser.raw({type : "application/json"}) , stripeWebhook)



export default router
import { signUp, login, verifyEmailToken } from "../controllers/authController.js";
import express from "express"



const router = express.Router();


router.post('/signup', signUp)
router.post('/login', login)
router.get('/verify-email/:emailToken', verifyEmailToken)




// "http://localhost:5000/signup"


export default router
import { signUp, login } from "../controllers/authController.js";
import express from "express"



const router = express.Router();


router.post('/signup', signUp)
router.post('/login', login)




// "http://localhost:5000/signup"


export default router
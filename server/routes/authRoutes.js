import { signUp, login, verifyEmailToken, logout, googleAuth } from "../controllers/authController.js";
import express from "express"
import { protect } from "../middlewares/authMidlleware.js";



const router = express.Router();


router.post('/signup', signUp)
router.post('/login', login)
router.post("/logout" , logout)
router.get('/verify-email/:emailToken', verifyEmailToken)
router.post('/google' , googleAuth)

router.get("/me" , protect , (req,res) => {
    res.status(200).json({
        user : {
            id : req.user._id,
            name : req.user.name,
            email : req.user.email,
            role : req.user.role
        }
    })
})


// "http://localhost:5000/signup"


export default router
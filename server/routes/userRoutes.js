import express from "express"
import { deleteUser, getAllUsers, updateProfile, updateUser } from "../controllers/userController.js"
import { access } from "../middlewares/authMidlleware.js"
import { authorize } from "../middlewares/roleMiddleware.js"


const router = express.Router()



// Admin Routes

router.get("/all-users" , access , authorize("admin") , getAllUsers)
router.put("/update-user/:id" , access , authorize("admin") , updateUser)
router.delete("/delete-user/:id" , access , authorize("admin") ,  deleteUser)


// Common Routes

router.put("/update-profile" , access , authorize("admin" , "user") ,  updateProfile)







export default router
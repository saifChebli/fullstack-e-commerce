import express from "express"
import { createProduct , getAllProducts , getSingleProduct , updateProduct , deleteProduct } from "../controllers/productController.js"
import { access , protect } from "../middlewares/authMidlleware.js"
import { authorize } from "../middlewares/roleMiddleware.js"
import { upload } from '../middlewares/upload.js'

const router = express.Router()


router.get("/all-products" , getAllProducts)
router.get("/single-product/:productId" , getSingleProduct)
router.post("/add-product" ,protect , authorize("admin") , upload.array("image" , 8),  createProduct)
router.put("/update-product/:productId" ,protect , authorize("admin") , updateProduct)
router.delete("/delete-product/:productId" ,protect , authorize("admin") ,  deleteProduct)



export default router
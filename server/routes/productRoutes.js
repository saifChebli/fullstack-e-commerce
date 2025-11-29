import express from "express"
import { createProduct , getAllProducts , getSingleProduct , updateProduct , deleteProduct } from "../controllers/productController.js"
import { access } from "../middlewares/authMidlleware.js"
import { authorize } from "../middlewares/roleMiddleware.js"


const router = express.Router()


router.get("/all-products" , getAllProducts)
router.get("/single-product/:productId" , getSingleProduct)
router.post("/add-product" ,access , authorize(["admin"]) , createProduct)
router.put("/update-product/:productId" ,access , authorize(["admin"]) , updateProduct)
router.delete("/delete-product/:productId" ,access , authorize(["admin"]) ,  deleteProduct)



export default router
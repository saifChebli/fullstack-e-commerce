import express from "express"
import { createCat, getAllCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js"
import { access } from "../middlewares/authMidlleware.js"
import { authorize } from "../middlewares/roleMiddleware.js"

const router = express.Router()


router.get("/categories", getAllCategories)
router.post("/add-category", access , authorize("admin") , createCat)
router.put("/update-category/:categoryId", access , authorize("admin"), updateCategory )
router.delete("/delete-category/:categoryId", access , authorize("admin"), deleteCategory)














export default router
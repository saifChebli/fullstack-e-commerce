import express from "express"
import { createCat, getAllCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js"
import { protect } from "../middlewares/authMidlleware.js"
import { authorize } from "../middlewares/roleMiddleware.js"

const router = express.Router()


router.get("/categories", getAllCategories)
router.post("/add-category", protect , authorize("admin") , createCat)
router.put("/update-category/:categoryId", protect , authorize("admin"), updateCategory )
router.delete("/delete-category/:categoryId", protect , authorize("admin"), deleteCategory)














export default router
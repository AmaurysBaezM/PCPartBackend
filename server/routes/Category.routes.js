import { Router } from "express";
import { getCategory, getCategories, updateCategory, deleteCategory, createCategory } from "../controllers/category.controller.js";


const router = Router()


router.get("/category", getCategories)
router.post("/category", createCategory)
router.put("/category/:id", updateCategory)
router.delete("/category/:id", deleteCategory)
router.get("/category/:id", getCategory)




export default router
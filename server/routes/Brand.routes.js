import { Router } from "express";
import { getBrand, getBrands, updateBrand,deleteBrand,createBrand } from "../controllers/brand.controller.js";


const router = Router()


router.get("/brand", getBrands)
router.post("/brand", createBrand)
router.put("/brand/:id", updateBrand)
router.delete("/brand/:id", deleteBrand)
router.get("/brand/:id", getBrand)




export default router
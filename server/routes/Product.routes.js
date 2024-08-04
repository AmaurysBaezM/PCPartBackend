import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct  } from "../controllers/product.controller.js";


const router = Router()


router.get("/productPage", getProducts)
router.post("/product", createProduct)
router.put("/product/:id", updateProduct)
router.delete("/product/:id", deleteProduct)
router.get("/product/:id", getProduct)





export default router
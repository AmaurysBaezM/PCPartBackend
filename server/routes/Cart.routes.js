import { Router } from "express";
import { getCartbyUser,CartsbyUserAndProduct, deleteCart} from "../controllers/cart.controller.js";


const router = Router()


router.get("/cart/user/:id", getCartbyUser)
router.post("/category/product", CartsbyUserAndProduct)
router.delete("/cart/:id", deleteCart)





export default router
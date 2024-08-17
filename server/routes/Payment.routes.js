import { Router } from "express";
import { getPrice } from "../controllers/payment.controller.js";


const router = Router()


router.get("/getPrice", getPrice)




export default router
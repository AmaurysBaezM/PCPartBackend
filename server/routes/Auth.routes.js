import { Router } from "express";
import { login, verifyToken,forgotPassword } from "../controllers/auth.controller.js";

const router = Router()



router.post("/login", login)
router.post("/verifyToken", verifyToken)
router.post("/forgotPassword", forgotPassword)




export default router
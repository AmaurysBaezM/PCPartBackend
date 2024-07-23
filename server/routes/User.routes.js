import { Router } from "express";
import { getUsers, createUser, deleteUser, updateUser, getUser } from "../controllers/user.controller.js";
import {body} from 'express-validator';


const router = Router()




const validateUser = [
    body ('UserName').not().isEmpty().withMessage('Nombre es requerido'),
    body ('UserEmail').isEmail().withMessage('Porfavor introduce un correo electronico valido'),
    body ('UserPasswords').isLength({min: 8}).withMessage('Contraseña debe tener almenos 8 caracteres').isStrongPassword().withMessage('Contraseña debe ser compleja'),
   



]




router.get("/user", getUsers)
router.post("/user",validateUser, createUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)
router.get("/user/:id", getUser)





export default router
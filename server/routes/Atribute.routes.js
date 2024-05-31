import { Router } from "express";
import { getAtribute, getAtributes, createAtribute, updateAtribute, deleteAtribute } from "../controllers/atribute.controller.js";


const router = Router()


router.get("/atribute", getAtributes)
router.post("/atribute", createAtribute)
router.put("/atribute/:id", updateAtribute)
router.delete("/atribute/:id", deleteAtribute)
router.get("/atribute/:id", getAtribute)




export default router
import { Router } from "express";
import { getSpecs, getSpec, createSpec, updateSpec, deleteSpec,SpecforProduct} from "../controllers/spec.controller.js";


const router = Router()


router.get("/specs", getSpecs)
router.post("/specs", createSpec)
router.put("/specs/:id", updateSpec)
router.delete("/specs/:id", deleteSpec)
router.get("/specs/:id", getSpec)
router.post("/specs/product/:id", SpecforProduct )




export default router
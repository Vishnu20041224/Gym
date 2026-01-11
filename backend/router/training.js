import express from "express"
import { getTraining,getOneTraining } from "../controller/trainersController.js";

const router = express.Router()

router.get("/trainers", getTraining)
router.get("/trainers/:id", getOneTraining)
export default router;
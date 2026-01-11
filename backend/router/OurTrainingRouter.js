import express from "express"
import { getOurTraining } from "../controller/ourTrainingController.js";

const router = express.Router()

router.get("/our-training", getOurTraining)

export default router;
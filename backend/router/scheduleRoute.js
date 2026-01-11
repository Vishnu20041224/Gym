import express from "express"
import { getSchedule } from "../controller/scheduleController.js";
const router = express.Router()

router.get("/schedule", getSchedule)

export default router;
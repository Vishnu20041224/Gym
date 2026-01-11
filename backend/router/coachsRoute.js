import express from "express"
import { getCoachs } from "../controller/coachsController.js";



const router = express.Router()
router.get("/coachs", getCoachs)
export default router;
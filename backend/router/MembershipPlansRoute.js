import express from "express";
import { getMembershipPlans } from "../controller/membershipPlansController.js";

const router = express.Router();
router.get("/membership-plans", getMembershipPlans);

export default router;
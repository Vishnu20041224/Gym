import express from "express";
import { cancelledBookingClassSchedule, getClassScheduleByType, getUserClassSchedule, postSelectClassSchedule} from "../controller/classScheduleController.js";
import { authRequied } from "../middleware/authRequied.js";
import { adminAccess } from "../middleware/adminAccess.js";
const router = express.Router();
router.get("/class-schedule/:type",authRequied, getClassScheduleByType);
// router.post("/class-schedule/:userId/:scheduleTimeId",authRequied, postSelectClassSchedule);
router.post("/class-schedule/:id",authRequied, postSelectClassSchedule);

//user class
router.get("/user-class-schedule",authRequied, getUserClassSchedule);

// cancel
router.post("/class-schedule/cancelled/:id",authRequied, cancelledBookingClassSchedule);


export default router;
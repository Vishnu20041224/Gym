import express from 'express';
import { authRequied } from '../middleware/authRequied.js';
import { adminAccess } from '../middleware/adminAccess.js';
import { cancelledBookingClassSchedule, getAllClassSchedule, getBookingClassSchedule } from '../controller/classScheduleController.js';

const router = express.Router();

router.get(
    "/admin-class-schedule",
    authRequied,
    adminAccess,
    getBookingClassSchedule
);

router.get("/get-all-class-schedule",authRequied,adminAccess,getAllClassSchedule)

export default router
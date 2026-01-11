import express from "express";
import { sendMessage ,sendMessageFromContact,sendMessageAllUsers,sendVerificationEmail, sendClassScheduleEmail, sendClassCancelledEmail, sendUserMessage} from "../controller/contactController.js";
import { authRequied } from "../middleware/authRequied.js";
import { adminAccess } from "../middleware/adminAccess.js";

const router = express.Router();

router.post("/getintouch", sendMessage);
router.post("/contact", sendMessageFromContact);
router.post("/sendalluser", sendMessageAllUsers);
router.post("/sendverification", sendVerificationEmail);
router.post("/sendclassschedule-mail/:scheduleTimeId",authRequied,sendClassScheduleEmail)

// By Admin
router.post("/sendclassschedule/:userId/:scheduleTimeId",authRequied,adminAccess,sendClassCancelledEmail );
router.post("/send-user-mail",authRequied,adminAccess,sendUserMessage)
router.post("/send-all-user-mail",authRequied,adminAccess,sendMessageAllUsers)

export default router;

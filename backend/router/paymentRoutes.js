import express from "express";
import { verifyPaymentScreenshot,getAllImages} from "../controller/paymentController.js";
import multer from "multer";
import { authRequied } from "../middleware/authRequied.js";
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) cb(null, true);
        else cb(new Error("Only image files allowed"), false);
    }
});


// Upload & verify payment
router.post("/verify-payment",authRequied, upload.single("image"), verifyPaymentScreenshot);


// Get all uploaded images
router.get("/all-images", getAllImages);

export default router;

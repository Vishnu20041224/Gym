import express from "express";
import multer from "multer";
import { verifyPaymentScreenshot } from "../controller/paymentController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files allowed"), false);
        }
    }
});

// Route
router.post(
    "/verify-payment",
    upload.single("image"),
    verifyPaymentScreenshot
);

export default router;

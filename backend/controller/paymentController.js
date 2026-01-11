import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import axios from "axios";
import pkg from "multer-storage-cloudinary";
const CloudinaryStorage = pkg.default;

import cloudinary from "../config/cloudinary.js";
import { User } from "../model/userModel.js";
import { Payment } from "../model/paymentModel.js";

const YOUR_UPI_ID = "rhvishnushankar@oksbi";

// ✅ Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
export const upload = multer({ storage });


// Helper: normalize text
const normalizeText = (text) =>
  text.toLowerCase().replace(/,/g, "").replace(/\s+/g, " ").trim();

// Helper: parse timestamp to Date
const parseTime = (timeStr) => {
  // "6 Jan 2026 2:18 am"
  const [day, month, year, hourMin, ampm] = timeStr.split(" ");
  const [hour, min] = hourMin.split(":").map(Number);
  let hr = hour;
  if (ampm.toLowerCase() === "pm" && hr !== 12) hr += 12;
  if (ampm.toLowerCase() === "am" && hr === 12) hr = 0;
  return new Date(`${month} ${day}, ${year} ${hr}:${min}`);
};


export const verifyPaymentScreenshot = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    let userId = req.user._id;
    console.log(userId)
    const { paymentTime, paymentTimePlus1Min, paymentTimePlus2Min ,membershipPlan, amount} = req.body;
    const paymentTimes = [paymentTime, paymentTimePlus1Min, paymentTimePlus2Min]
      .filter(Boolean)
      .map(normalizeText)
      .map(parseTime);

    // 🌍 Cloudinary gives secure_url for uploaded image
    const imageUrl = req.file.path || req.file.secure_url;

    // 🔍 OCR
    const result = await Tesseract.recognize(imageUrl, "eng");
    const extractedText = result.data.text;
    const extractedTextNorm = normalizeText(extractedText);

    // ✅ UPI check
    const upiMatched = extractedTextNorm.includes(YOUR_UPI_ID.toLowerCase());

    // 🕒 Time check
    const dateRegex = /(\d{1,2}\s\w{3}\s\d{4}\s\d{1,2}:\d{2}\s(?:am|pm))/gi;
    const datesInText = (extractedTextNorm.match(dateRegex) || []).map(parseTime);

    const dateMatched = paymentTimes.some((ft) =>
      datesInText.some((ot) => Math.abs(ot - ft) <= 2 * 60 * 1000)
    );

    if (!upiMatched || !dateMatched) {
      return res.json({
        success: false,
        message: "⚠️ UPI ID or payment time not matched",
        extractedText,
      });
    }

    // update 

    const payment = await Payment.create({
      userId,
      membershipPlan:membershipPlan,
      amount:Number(amount),
      paymentStatus: "pending",
    });

    await User.findByIdAndUpdate(userId, {
      isMembership: true,
      membershipPlan: membershipPlan,
      paymentStatus: "pending",
    });

    res.json({
      success: true,
      message: "✅ Payment detected. Verification pending.",
      imageUrl, // Cloudinary global URL
      text: extractedText,
    });
  } catch (error) {
    console.error("OCR error:", error);
    res.status(500).json({
      success: false,
      message: "❌ Payment  failed.",
    });
  }
}

export const getAllImages = (req, res) => {
  const uploadsDir = path.join("uploads");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to read folder" });

    const images = files.filter((file) => file.match(/\.(jpg|jpeg|png|gif|webp)$/i));

    const imagePaths = images.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file}`);

    res.json(imagePaths);
  });
};

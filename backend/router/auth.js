import express from "express"
import {signup,login, getOneUser, getUser, logoutUser, updateProfile} from "../controller/auth.js"
import { authRequied } from "../middleware/authRequied.js";
import multer from "multer";
const router = express.Router()
const upload = multer({ dest: "uploads/" });

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logoutUser)
router.get("/checktoken", authRequied, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});
router.put(
  "/update-profile",
  authRequied,
  upload.single("userImage"),
  updateProfile
);
router.get("/user",getUser)
router.get("/user/:id",getOneUser)


export default router
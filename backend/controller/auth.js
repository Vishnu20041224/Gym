import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { User } from "../model/userModel.js"
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const signupToken = ({ _id, name, email, phoneNo }) => {
    return jwt.sign(
        { _id, name, email, phoneNo },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRES_IN || "30d" }
    )
}

export const signup = async (req, res) => {
    try {
        let { name, email, phoneNo, password } = req.body

        if (!name) return res.status(401).json({ message: "Invailed name" })
        if (!email) return res.status(401).json({ message: "Invailed email" })
        if (!phoneNo) return res.status(401).json({ message: "Invailed phoneNo" })
        if (!password) return res.status(401).json({ message: "Invailed password" })

        const exit = await User.findOne({ email })
        if (exit) return res.status(409).json({ message: `${email} its already SignUp Please go and Login` })

        const hashPassword = await bcryptjs.hash(password, 10)

        // email verification


        let newUser = await User.create({ name, email, phoneNo, password: hashPassword })

        let token = signupToken({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phoneNo: newUser.phoneNo,
        })

        res.cookie("token", token, {
            httpOnly: true,      // ✅ safer, JS cannot read it
            secure: false,       // false on localhost, true in HTTPS production
            sameSite: "lax",     // or "none" if cross-site in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            message: "Signup successful",
            user: newUser
        })


    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = signupToken({
            _id: user._id,
            email: user.email,
            phoneNo: user.phoneNo,
        });

        // 🍪 Send cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // HTTPS only in production
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,      
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, bio } = req.body;

    let profileImageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
        width: 500,
        crop: "scale",
      });

      profileImageUrl = result.secure_url;

      // 🔥 delete temp file
      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(profileImageUrl && { userImage: profileImageUrl }),
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const getUser = async (req, res) => {
    try {

        let user = await User.find({})
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" })

        res.status(200).json({ success: true, data: user })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server error" });

    }
}

export const getOneUser = async (req, res) => {
    try {
        let { id } = req.params
        if (!id) return res.status(404).json({ success: false, message: "User ID is required" })

        let user = await User.findById(id)
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" })

        res.status(200).json({ success: true, data: user })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server error" });

    }
}
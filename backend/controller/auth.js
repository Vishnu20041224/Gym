import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { User } from "../model/userModel.js"


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
            httpOnly: true,
            secure: false,      // HTTPS only in production
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


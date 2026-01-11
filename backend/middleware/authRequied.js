import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js";

export const authRequied = async (req, res, next) => {
    try {
        // let auth = req.headers.authorization || ""
        // let token = auth.startsWith("Bearer ") ? auth.slice(7) : null

        // const token = req.cookies.token; // ✅ from cookie
        const token = req.cookies?.token;

        if (!token) return res.status(401).json({ message: "user not authenticated login required", success: false })
        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        let user = await User.findById(decoded._id)
        if (!user) return res.status(401).json({ message: "User not found", success: false })
        req.user = user
        
        next()
    } catch (error) {
        res.status(401).json({ message: "Token Failed" })
    }
}
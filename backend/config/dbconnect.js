import mongoose from "mongoose";
import { User } from "../model/userModel.js";

export const dbConnect = async (url) => {
    try {
        if (!url) return console.log("MongoDB URL was not provide")
        await mongoose.connect(url, {
            dbName: "gym"
        })
        console.log("DB connect")
    } catch (error) {
        console.log(error)
        return error
    }
}
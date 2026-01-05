import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import { dbConnect } from "./config/dbconnect.js";
import authRoter from "./router/auth.js"
import paymentRoutes from "./router/paymentRoutes.js"


dotenv.config();
const app = express()


app.use(cookieParser());



// Middleware

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json())
app.use("/uploads", express.static("uploads"));

// router

app.get("/",(req,res)=>{
    res.json("server was runing")
})
app.use("/api",authRoter)
app.use("/api/payment", paymentRoutes);


app.listen(process.env.PORT, () => {
    console.log(`server was runing in ${process.env.PORT}`)
    dbConnect(process.env.MONGODB_URL)
})

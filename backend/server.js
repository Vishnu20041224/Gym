import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import { dbConnect } from "./config/dbconnect.js";
import authRoter from "./router/auth.js"
import paymentRoutes from "./router/paymentRoutes.js"
import contactRoute from "./router/contactRoute.js";
import { seed } from "./util/seed.js";
import OurTrainingRouter from "./router/OurTrainingRouter.js";
import trainingRouter from "./router/training.js";
import scheduleRoute from "./router/scheduleRoute.js";
import membershipPlansRoute from "./router/MembershipPlansRoute.js";
import testimonialsRoute from "./router/testimonialsRoute.js";
import coachsRoute from "./router/coachsRoute.js";
import classScheduleRoute from "./router/classScheduleRoute.js";

// admin
import adminClassScheduleRouter from "./router/adminClassScheduleRouter.js";

dotenv.config();
const app = express()


app.use(cookieParser());



// Middleware

app.use(cors({
  origin: ["http://localhost:5173", "https://vishnu-gym.vercel.app", "https://vishnu-gym.onrender.com"],
  credentials: true
}));


app.use(express.json())

app.use("/uploads", express.static("uploads"));


// router

app.get("/", (req, res) => {
  res.json("server was runing")
})
app.use("/api", authRoter)
app.use("/api/payment", paymentRoutes);
app.use("/api", contactRoute);

app.use("/api", OurTrainingRouter)
app.use("/api", trainingRouter)
app.use("/api", scheduleRoute)
app.use("/api", membershipPlansRoute)
app.use("/api", testimonialsRoute)
app.use("/api", coachsRoute)
app.use("/api", classScheduleRoute)
app.use("/api", adminClassScheduleRouter)


app.listen(process.env.PORT, () => {
  console.log(`server was runing in ${process.env.PORT}`)
  dbConnect(process.env.MONGODB_URL)
  // seed(process.env.MONGODB_URL)
})

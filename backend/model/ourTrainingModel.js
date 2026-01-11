import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    icon: {
      type: String, // e.g. "HeartPulse"
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    msg: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("ourTraining", serviceSchema);

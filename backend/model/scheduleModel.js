import mongoose from "mongoose";

const scheduleItemSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    class: { type: String, required: true },
    instructor: { type: String, required: true }
  },
  { timestamps: true }
);
export default mongoose.model("Schedule", scheduleItemSchema);

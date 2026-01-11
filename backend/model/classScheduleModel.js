import mongoose from "mongoose";

const classScheduleSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
      trim: true, // "6 AM", "7 PM"
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    class: {
      type: String,
      required: true,
      enum: [
       "strength",
      "cardio",
      "hiit",
      "yoga",
      "functional-training",
      "weight-management",
      "post-natal-fitness",
      "sports-performance"
      ],
      lowercase: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trainingName: {            // ✅ ADD THIS
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ClassSchedule", classScheduleSchema);

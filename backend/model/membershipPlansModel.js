import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema(
  {
    planType: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    about: {
      type: [String],
      required: true,
    },
    choose: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MembershipPlan", membershipPlanSchema);

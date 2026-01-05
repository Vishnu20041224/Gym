import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phoneNo: {
      type: String,
      required: true,
      minlength: 9
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    isAdmin:{
      type:Boolean,
      default:false
    }

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

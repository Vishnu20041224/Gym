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
      minlength: 9,
      maxlength:10
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    userImage:{
      type:String,
      default:null
    },
    bio:{
      type:String,
      default:null
    },
     isMembership: {
      type: Boolean,
      default:false,
    },
    MembershipPlan: {
      type: String,
      default:null,
    },
    paymentStatus: {
      type: String,
      default:null,
    },
    isAdmin:{
      type:Boolean,
      default:false
    }

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

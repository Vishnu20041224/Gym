import React, { useState } from "react";
import { Dumbbell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { successfullyToast, warningToast } from "../lib/toast";
import { sendverification, signup } from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    conformPassword: "",
    termsConditions: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState(null); // store OTP from backend for testing
  const [loading, setLoading] = useState(false);

  // handle all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // send OTP
  const handleSendOTP = async () => {
    if (!form.name || !form.email || !form.phoneNo || !form.password || !form.conformPassword) {
      warningToast("Sign Up", "Please fill all required fields");
      return;
    }
    if (form.phoneNo.length !== 10) {
      warningToast("Sign Up", "Phone Number Not Vailed");
      return;
    }

    if (form.password !== form.conformPassword) {
      warningToast("Sign Up", "Passwords do not match");
      return;
    }

    if (!form.termsConditions) {
      warningToast("Sign Up", "Accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);
      const res = await sendverification({
        email: form.email,
        name: form.name,
      });
      setGeneratedOTP(res.data.otp); // save OTP temporarily, in prod use DB/session
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // verify OTP and submit signup
  const handleVerifyAndSignup = async () => {
    if (otp.length !== 6) {
      alert("Enter 6-digit OTP");
      return;
    }

    if (otp !== String(generatedOTP)) {
      alert("Incorrect OTP");
      return;
    }

    // OTP correct → submit signup
    try {
      const res = await signup(
        {
          name: form.name,
          email: form.email,
          phoneNo: form.phoneNo,
          password: form.password,
        }
      );
      successfullyToast("Signup", "Account created successfully");
      navigate("/");
    } catch (err) {
      warningToast("Signup", err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/* Logo Header */}
      <div className="flex gap-2 items-center px-5 md:px-8 lg:px-10 py-5">
        <Dumbbell className="p-2 btn-primary text-black rounded-sm max-md:hidden" size={35} />
        <Dumbbell className="p-1.5 btn-primary text-black rounded-sm md:hidden" size={25} />
        <h1 className="text-primary text-sm md:text-xl font-semibold">Apex Athletics</h1>
      </div>

      <div className="flex flex-col justify-center items-center min-h-[90vh] px-4">
        <div className="bg-[#1e2128] w-full max-w-md p-6 rounded-2xl relative">
          <h1 className="pb-4 font-semibold text-4xl text-center">
            Start Your Fitness Journey Today!
          </h1>
          <p className="text-center text-[#bdc1ca] pb-6">
            Join Apex Athletics and unlock expert trainers and exclusive programs.
          </p>

          {!otpSent ? (
            // Signup Form Before OTP
            <form className="flex flex-col gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
              <input
                className="py-2 px-3 rounded-md bg-[#323743] outline-none text-white"
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className="py-2 px-3 rounded-md bg-[#323743] outline-none text-white"
                type="email"
                name="email"
                placeholder="user@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
              <input
                className="py-2 px-3 rounded-md bg-[#323743] outline-none text-white"
                type="number"
                name="phoneNo"
                placeholder="Phone Number"
                value={form.phoneNo}
                onChange={handleChange}
              />
              <input
                className="py-2 px-3 rounded-md bg-[#323743] outline-none text-white"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <input
                className="py-2 px-3 rounded-md bg-[#323743] outline-none text-white"
                type="password"
                name="conformPassword"
                placeholder="Confirm Password"
                value={form.conformPassword}
                onChange={handleChange}
              />
              <div className="flex gap-2 items-center mt-4 text-sm">
                <input
                  type="checkbox"
                  name="termsConditions"
                  checked={form.termsConditions}
                  onChange={handleChange}
                />
                <p>
                  I agree to the{" "}
                  <span className="text-[#FA8C38]">Terms & Conditions</span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleSendOTP}
                className="w-full btn-primary rounded-md py-2 mt-4 text-black"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send Verification OTP"}
              </button>
            </form>
          ) : (
            // OTP Input after OTP sent
            <div className="flex flex-col gap-4 w-full">
              <p className="text-center text-[#bdc1ca]">
                Enter the 6-digit OTP sent to your email
              </p>


              <div className="flex justify-center items-center">

                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                type="button"
                onClick={handleVerifyAndSignup}
                className="w-full btn-primary rounded-md py-2 mt-4 text-black"
              >
                Verify OTP & Signup
              </button>
            </div>
          )}
        </div>

        <Link to="/login" className="mt-6 text-sm">
          Already have an account?
          <span className="text-[#FA8C38] ml-1">Log in</span>
        </Link>
      </div>
    </>
  );
};

export default Signup;

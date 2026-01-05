import React, { useState } from "react";
import { Dumbbell } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios"


const Signup = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    conformPassword: "",
    termsConditions: false,
  });

  // handle all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.termsConditions) {
      alert("Please accept Terms & Conditions");
      return;
    }

    if (form.password !== form.conformPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
     
      const res = await axios.post("http://localhost:3000/api/signup",
        {
          name: form.name,
          email: form.email,
          phoneNo: form.phoneNo,
          password: form.password,
        },
        {
          withCredentials: true, 
        }
      );

      console.log("Signup success:", res.data);
      navigate("/")
      scrollTo(0,0)

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }


  };

  return (
    <>
      {/* Logo Header */}
      <div className="flex gap-2 items-center px-5 md:px-8 lg:px-10 py-5">
        <Dumbbell
          className="p-2 btn-primary text-black rounded-sm max-md:hidden"
          size={35}
        />
        <Dumbbell
          className="p-1.5 btn-primary text-black rounded-sm md:hidden"
          size={25}
        />
        <h1 className="text-primary text-sm md:text-xl font-semibold">
          Apex Athletics
        </h1>
      </div>

      {/* Signup Form */}
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <div className="bg-[#1e2128] w-full max-w-md p-6 rounded-2xl">
          <h1 className="pb-4 font-semibold text-4xl text-center">
            Start Your Fitness Journey Today!
          </h1>

          <p className="text-center text-[#bdc1ca] pb-6">
            Join Apex Athletics and unlock expert trainers and exclusive
            programs.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full"
          >
            <input
              className="py-2 px-3 rounded-md bg-[#323743] outline-none text-white "
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
              placeholder="+1 (555) 123-4567"
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
              type="submit"
              className="w-full btn-primary rounded-md py-2 mt-4 text-black"
            >
              Create Account
            </button>
          </form>
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

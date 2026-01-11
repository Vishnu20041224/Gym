import { Dumbbell } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { warningToast } from '../lib/toast'
import { useCookies } from 'react-cookie'
const Login = () => {

  const navigate = useNavigate()
  let [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // handle all input changes
  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://localhost:5000/api/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true, // 🔥 REQUIRED
        }
      );

      console.log("Login success:", res.data);
      
      if(res.data.user.isAdmin) return navigate("/admin")

      navigate("/")
      scrollTo(0, 0)

    } catch (error) {
      console.error(error);
      warningToast("Login Failed", error.response?.data?.message || "Signup failed")
    }
  };

  return (
    <div>
      <div className='flex gap-2 items-center px-5 md:px-8 lg:px-10 pt-5 md:pt-8 lg:pt-10'>
        <Dumbbell className='p-2 btn-primary text-black rounded-sm max-md:hidden' size={35} color='black' />
        <Dumbbell className='p-1.5 btn-primary text-black rounded-sm md:hidden' size={25} color='black' />
        <h1 className='text-primary text-sm md:text-xl font-semibold'>Apex Athletics</h1>
      </div>

      <div className='flex flex-col gap-5 md:gap-7 lg:gap-10 justify-center items-center h-[60vh] w-full my-3 md:my-6 lg:my-20'>
        <div className='bg-[#1e2128] p-2 md:p-3.5 lg:p-5 w-xs mx-auto rounded-2xl '>
          <h1 className='pb-3 md:pb-4 lg:pb-6 font-semibold text-4xl text-center'>Log In</h1>

          <div className='flex flex-col gap-3 justify-center items-center w-full mx-auto'>
            <input value={form.email} onChange={handleChange} className='py-1.5 px-3 rounded-md bg-[#323743] text-white w-full my-1' type="email" name="email" placeholder='user.@gamil.com' />
            <input value={form.password} onChange={handleChange} className='py-1.5 px-3 rounded-md bg-[#323743] text-white w-full my-1' type="password" name="password" placeholder='********' />

            <h1 className='text-[#FA8C38] text-end w-full py-2 cursor-pointer'>Forgot password?</h1>

            <button onClick={handleSubmit} className='w-full btn-primary rounded-md cursor-pointer py-2 px-5 text-black font-normal my-3'>Log In</button>

          </div>


        </div>

        <Link to={"/signup"} className='text-center pb-10'>Don't have an account? <span className='text-[#FA8C38]'> Create account</span></Link>
      </div>
    </div>
  )
}

export default Login

import React, { useEffect, useState } from 'react'
import { Check, Clock } from 'lucide-react';
import axios from 'axios';
// image
// import Strength from "../assets/img/Strength.png"
// import Cardio from "../assets/img/Cardio.png"
// import Yoga from "../assets/img/Yoga.png"
// import hiit from "../assets/img/hiit.png"
import { Link, useNavigate } from 'react-router-dom';
import { warningToast } from '../lib/toast';
import { checkAuthenticatedUser } from '../utils/api';
const Programs = () => {

  const navigate = useNavigate()


  const navigateToClassSchedule = async (type) => {
    try {
      await checkAuthenticatedUser()

      navigate(`/class-schedule/${type.toLowerCase()}`);
    } catch (error) {
      warningToast("Login First", error.response?.data?.message || "Please login to view class schedule");
      navigate("/login");
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      {/* hero page */}
      <div className='flex justify-around max-md:py-16 md:justify-center items-center flex-col gap-2 md:gap-6 lg:gap-8 h-screen w-full'>
        <h1 className='text-center text-3xl md:text-4xl lg:text-7xl font-semibold px-3 md:px-6 lg:px-20 flex flex-col gap-0'>
          <span> Forge Your Best Self:</span>
          <span> Discover Our Transformative</span>
          <span>Programs</span>
        </h1>
        <h1 className='text-primary px-3 text-center'>Unleash Your Potential with Expert-Designed Training</h1>
        <p className='max-w-4xl mx-auto text-center text-sm md:text-[18px]/8 font-normal px-3'>At Apex Athletics, we believe in empowering you to achieve your fitness goals through comprehensive, science-backed programs. Our diverse offerings cater to all levels, from beginners to seasoned athletes, ensuring a challenging yet rewarding path to peak physical condition. Dive into our specialized training methodologies and find the perfect fit for your journey.</p>
        <button className='py-2 px-3 md:px-5 md:py-2 btn-primary text-black rounded-3xl font-semibold'>Explore Programs</button>
      </div>

      {/* Strength Training: Build Raw Power */}

      <div className='px-3 max-w-6xl mx-auto flex justify-between items-center flex-col md:flex-row  py-6 md:py-8 lg:py-10'>
        <div className='flex-1/2'>
          <img src={"https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/Strength_fztkbo.png"} className='p-1 rounded-2xl' alt="" />
        </div>

        <div className='flex-1/2 max-md:mt-5'>
          <h1 className='text-xl md:text-3xl lg:text-6xl font-semibold pb-3 md:pb-5'>Strength Training: Build Raw Power</h1>
          <p className='font-normal text-xs md:text-lg lg:text-xl/6 pb-4'>Transform your physique and enhance your functional strength with our meticulously crafted strength training programs. Designed to progressively overload your muscles, you'll gain lean mass, increase endurance, and sculpt a powerful body.</p>

          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Key Benefits</h1>
            <ul>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Develop significant muscle mass and definition.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Improve bone density and joint stability.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Boost metabolism and promote fat loss.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Increase overall physical resilience and power.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Enhance athletic performance across all disciplines.</li>
            </ul>
          </div>

          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Sample Class Format</h1>
            <ul>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Dynamic Warm-up (10 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Compound Lifts (Squats, Deadlifts, Bench Press - 30 min) </span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Accessory Exercises (Biceps, Triceps, Shoulders - 20 min) </span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Core Work & Cool-down (10 min) </span></li>
            </ul>
          </div>

          <button onClick={() => navigateToClassSchedule("strength")} className='block text-center px-4 mt-3 py-2 rounded-3xl border border-[#FA8C38] text-primary w-full text-lg cursor-pointer'>View Schedule</button>
        </div>

      </div>

      {/* Cardio: Elevate Your Endurance */}

      <div className='px-3 max-w-6xl max-md:flex-col-reverse mx-auto flex justify-between items-center flex-col md:flex-row  py-6 md:py-8 lg:py-10'>

        <div className='flex-1/2  max-md:mt-5'>
          <h1 className='text-xl md:text-3xl lg:text-6xl font-semibold pb-3 md:pb-5'>Cardio: Elevate Your Endurance</h1>
          <p className='font-normal text-xs md:text-lg lg:text-xl/6 pb-4'>Boost your cardiovascular health and stamina with our dynamic cardio programs. From high-intensity intervals to steady-state sessions, our training will improve your heart health, increase your lung capacity, and optimize fat burning.</p>

          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Key Benefits</h1>
            <ul>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Enhance cardiovascular endurance and stamina.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Improve heart and lung health.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Efficiently burn calories and reduce body fat.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Reduce stress and improve mood.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Increase overall energy levels for daily activities.</li>
            </ul>
          </div>

          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Sample Class Format</h1>
            <ul>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Active Warm-up (5 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Interval Training (Treadmill, Rower, Bike - 35 min) </span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Cool-down & Stretching (10 min) </span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Optional: Group Run (60 min) </span></li>
            </ul>
          </div>

          <Link to={"/class-schedule/cardio"} className='block text-center px-4 mt-3 py-2 rounded-3xl border border-[#FA8C38] text-primary w-full text-lg cursor-pointer'>View Schedule</Link>
        </div>

        <div className='flex-1/2 max-md:mt-5'>
          <img src={"https://res.cloudinary.com/dlpti92vt/image/upload/v1767850008/Cardio_z8e3yi.png"} className='p-1 rounded-2xl' alt="" />
        </div>

      </div>

      {/* HIIT: Maximize Your Burn */}

      <div className='max-w-6xl mx-auto px-3 py-6 md:py-8 lg:py-10'>
        <div className='text-center max-w-3xl mx-auto'>
          <h1 className='text-xl md:text-3xl lg:text-6xl font-semibold pb-3 md:pb-5'>HIIT: Maximize Your Burn</h1>
          <p className='font-normal text-xs md:text-base mb-4'>Experience the ultimate full-body workout with High-Intensity Interval Training. Our HIIT sessions combine short bursts of intense exercise with brief recovery periods, designed to torch calories, build explosive power, and boost your metabolism long after the workout.</p>
        </div>

        <div className='py-5 md:py-8 lg:py-10'>
          <img className='w-full rounded-2xl' src={"https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/hiit_eg1zlm.png"} alt="" />
        </div>

        <div className=' grid grid-cols-1 md:grid-cols-2  justify-between gap-2 items-start flex-col md:flex-row'>
          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Key Benefits</h1>
            <ul>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Increase flexibility and range of motion.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Improve balance and coordination.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Strengthen core muscles and stabilize the spine.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Reduce stress and promote mental clarity.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Enhance body awareness and posture.</li>
            </ul>
          </div>

          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Sample Class Format</h1>
            <ul>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Dynamic Warm-up (7 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Circuit 1: Burpees, Box Jumps, Sprints (20 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Active Recovery (5 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Circuit 2: Kettlebell Swings, Mountain Climbers, Battle Ropes (20 min) </span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Cool-down & Static Stretching (8 min)</span></li>
            </ul>
          </div>
        </div>

        <div className='flex justify-center'>
          <Link to={"/class-schedule/hiit"} className=' px-8 mt-3 py-2 rounded-3xl border border-[#FA8C38] text-primary text-lg cursor-pointer'>View Schedule </Link>
        </div>
      </div>

      {/* Yoga: Balance & Flexibility */}

      <div className='px-3 max-w-6xl mx-auto flex justify-between items-center flex-col md:flex-row  py-6 md:py-8 lg:py-10'>
        <div className='flex-1/2'>
          <img src={"https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/Yoga_jjgvvp.png"} className='p-1 rounded-2xl' alt="" />
        </div>

        <div className='flex-1/2 max-md:mt-5'>
          <h1 className='text-xl md:text-3xl lg:text-6xl font-semibold pb-3 md:pb-5'>Yoga: Balance & Flexibility</h1>
          <p className='font-normal text-xs md:text-lg lg:text-xl/6 pb-4'>Discover inner peace and physical harmony with our diverse yoga classes. From Vinyasa to Restorative, our certified instructors will guide you through poses that enhance flexibility, improve balance, build core strength, and calm your mind.</p>

          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Key Benefits</h1>
            <ul>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Rapidly improve cardiovascular fitness.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' />Significant calorie burn in less time.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Boost metabolism for hours post-workout.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Enhance strength and muscle endurance.</li>
              <li className='flex gap-2 py-1 md:py-1.5 lg:py-2 max-md:text-[14px]'><Check color='#FA8C38' /> Improve anaerobic capacity and explosive power.</li>
            </ul>
          </div>

          <div className='my-5'>
            <h1 className='text-xl md:text-xl lg:text-2xl text-primary font-semibold pb-3'>Sample Class Format</h1>
            <ul>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Centering & Breathwork (5 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Sun Salutations & Flow (30 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Standing & Balancing Poses (15 min)</span></li>
              <li className='flex items-center gap-2 py-1 md:py-1.5 lg:py-2  max-md:text-[14px]'><Clock color='#FA8C38' /> <span className='flex-1'> Cool-down & Savasana (10 min)</span></li>
            </ul>
          </div>

          <Link
            to={"/class-schedule/yoga"}
            className="block w-full px-4 mt-3 py-2 rounded-3xl border border-[#FA8C38] text-primary text-lg text-center cursor-pointer"
          >
            View Schedule
          </Link>
        </div>

      </div>



    </div>
  )
}

export default Programs

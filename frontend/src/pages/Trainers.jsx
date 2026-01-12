import React, { useState } from 'react'
import { Check } from 'lucide-react';
import { useEffect } from 'react'
import { checkAuthenticatedUser, getCoachs } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { warningToast } from '../lib/toast';
import axios from 'axios';
const Trainers = () => {



  const navigate = useNavigate();

  let [coachs, setCoachs] = useState([])
  let [coachstype, setCoachstype] = useState([])
  let [isLoading, setIsLoading] = useState(false)

  async function fetchData() {
    setIsLoading(true)
    const res = await getCoachs()
    console.log(res.data);
    setCoachs(res?.data?.data);

    let type = res?.data?.data.map((coach) => (coach.type))
    console.log(["All", ...type])
    setCoachstype(["All", ...type])

    setIsLoading(false)
  }

  const navigateToClassSchedule = async (type) => {
    console.log(type);
    try {
      let res = await checkAuthenticatedUser()
      navigate(`/class-schedule/${type.toLowerCase()}`);
    } catch (error) {
      warningToast("Login First", error.response?.data?.message || "Please login to view class schedule");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  let [setectCoach, setSelectCoach] = useState("All")
  let [filteredCoaches, setFilteredCoaches] = useState(coachs)

  const setectCoachFun = (type) => {
    setSelectCoach(type)
  }


  useEffect(() => {
    if (setectCoach === "All") {
      setFilteredCoaches(coachs)
    } else {
      setFilteredCoaches(coachs.filter((coach) => coach.type === setectCoach))
    }
  }, [setectCoach, coachs])

  return (
    <div className="">
      <div className='flex justify-center items-center flex-col gap-3 h-[85vh] bg-[#4B2102]'>
        <h1 className='text-2xl md:text-4xl lg:text-7xl font-semibold px-3 md:px-6 lg:px-20 '>Meet Our Elite Trainers</h1>
        <p className='max-w-2xl mx-auto text-center text-sm md:text-[18px]/8 font-normal px-3'>Our team of certified professionals is dedicated to guiding you through every step of your fitness journey. With diverse expertise and unwavering passion, they are here to unlock your full potential.</p>
        <a href="#programs" className='py-1 font-medium px-6 rounded-3xl mt-7 btn-primary text-xs md:text-lg cursor-pointer text-black shadow-2xl shadow-[#FA8C38]'>View All Trainers</a>
      </div>
      <div className='max-w-6xl mx-auto px-2 pt-6 md:pt-8 lg:pt-10'>

        {/* Find Your Perfect Coach */}
        <h1 className='text-center text-xl md:text-3xl lg:text-5xl font-semibold pt-6 md:pt-8 lg:pt-10'>Find Your Perfect Coach</h1>

        {/* filter */}
        <div className=' py-5 lg:py-6'>
          <div className='flex justify-center items-center flex-wrap gap-2 lg:gap-3'>
            {coachstype.map((type, index) => (
              <h1 key={index} onClick={() => setectCoachFun(type)} className={`${setectCoach === type ? "bg-[#FA8C38] text-black " : "bg-[#212121] text-white"} font-medium px-2 py-1 md:px-3.5 lg:px-5 md:py-1.5 rounded-xl cursor-pointer md:mx-2 md:my-4 max-md:text-sm`}>{type}</h1>
            ))}
          </div>
        </div>

        {/* details */}

        <div id="programs" className=' py-6 md:py-8 lg:py-10 p-3'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filteredCoaches.map((coach, index) => (
              <div key={index}>
                {/* image section*/}
                <div className='relative mb-4'>
                  <div className='absolute inset-0 bg-black/40 z-20'></div>
                  <img src={coach.image} className='w-full h-full object-cover z-10 rounded-t-2xl' alt={coach.name} />
                  <div className='py-3 absolute bottom-0 left-0 px-3 z-30'>
                    <h1 className='text-lg md:text-xl lg:text-2xl font-bold pb-1'>{coach.name}</h1>
                    <h1 className='text-sm md:text-lg lg:text-xl text-primary font-medium capitalize'>{coach.type}</h1>
                  </div>
                </div>
                {/* details */}
                <div>
                  <p className='text-xs md:text-sm lg:text-base line-clamp-3'>{coach.msg}</p>
                  <div className='my-3'>
                    <h1 className='pb-1'>Certifications :</h1>
                    <ul>
                      {coach.certifications.map((cert) => (
                        <li className='flex gap-2 items-center text-sm md:text-base'><Check color='#FA8C38' /> <span>{cert}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button onClick={() => navigateToClassSchedule(coach.type)} className='px-5 py-1.5 btn-primary cursor-pointer rounded-2xl w-full my-2 text-black font-medium'>Book a Session</button>
              </div>))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Trainers

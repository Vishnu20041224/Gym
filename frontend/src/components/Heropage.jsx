import heropage from '../assets/img/hero.png'
import { TextRoll } from '@/components/core/text-roll';
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { checkAuthenticatedUser } from '../utils/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroPage = () => {

  const [userName, setUserName] = useState(null)
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const getUser = async () => {
    try {
      setIsProfileUpdated(true)
      const res = await checkAuthenticatedUser()
      if (res.data.success) {
        setUserName(res.data.user.name)
      }
    } catch (error) {
      setUserName(null)
      console.log("User not logged in");
    }
    finally {
      setIsProfileUpdated(false);
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // Optional: debug when username updates
  useEffect(() => {
    if (userName) {
      console.log("Hero Page:", userName)
    }
  }, [userName])


  return (
    <div className="h-screen w-full relative">
      <img
        src={"https://res.cloudinary.com/dlpti92vt/image/upload/v1767850009/hero_q5iml8.png"}
        alt="Hero"
        className="h-full w-full object-cover"
      />
      <div className='top-0 left-0 absolute bg-black/60 h-full w-full'></div>
      <div className='top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 text-center w-full'>
        <TextEffect per='char' preset='fade' className='text-3xl md:text-4xl lg:text-7xl font-semibold px-3 md:px-6 lg:px-20 block'>Unleash Your Potential. Transform Your Body.</TextEffect >
        {!userName && !isProfileUpdated && <Link
          to={"/login"}
          className={`btn-primary text-black px-4 py-1.5 rounded-lg mt-6 inline-block font-semibold`}
        >
          {"Join Now"}
        </Link>}
      </div>
    </div>
  )
}

export default HeroPage

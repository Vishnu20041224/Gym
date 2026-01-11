import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MenuIcon, X, Dumbbell, CircleUserRound } from "lucide-react"
import { checkAuthenticatedUser } from '../utils/api'

const Nav = () => {
  const [open, setOpen] = useState(false)
  const [userName, setUserName] = useState(null)
  const [userData, setUserData] = useState(null)


  const getUser = async () => {
    try {
      const res = await checkAuthenticatedUser()
      if (res.data.success) {
        setUserName(res.data.user.name)
        setUserData(res.data.user)
        console.log(res.data.user)
      }
    } catch (error) {
      console.log("User not logged in");
    }
  }

  useEffect(() => {
    getUser();

    const handleProfileUpdate = () => {
      getUser(); // 🔥 refetch updated user
    };

    window.addEventListener("profile-updated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  // Optional: debug when username updates
  useEffect(() => {
    if (userName) {
      console.log("User Name:", userName)
    }
  }, [userName])

  return (
    <div className='w-full bg-black z-40'>
      <div className="max-w-6xl mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className='flex gap-2 items-center'>
            <Dumbbell className='p-2 btn-primary text-black rounded-sm max-md:hidden' size={35} />
            <Dumbbell className='p-1.5 btn-primary text-black rounded-sm md:hidden' size={25} />
            <h1 className='text-primary text-sm md:text-xl font-semibold'>
              Apex Athletics
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : ""}>Home</NavLink>
            <NavLink to="/programs" className={({ isActive }) => isActive ? "text-primary" : ""}>Programs</NavLink>
            <NavLink to="/trainers" className={({ isActive }) => isActive ? "text-primary" : ""}>Trainers</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary" : ""}>Contact</NavLink>
          </div>

          {/* Desktop Button */}
          <div
            className={`btn-primar text-base font-semibold px-3.5 py-1 rounded-lg max-md:hidden`}
          >
            {userName ?
              <NavLink to={"/profile"} className={({ isActive }) => isActive ? "text-primary flex gap-2 items-center" : "flex gap-2 items-center"}>
                {userData.userImage ? (
                  <img
                    src={userData.userImage}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <CircleUserRound
                    className="rounded-full border-[#FA8C38]"
                    size={30}
                  />
                )}
                <h1>Profile</h1>
              </NavLink> :
              <NavLink to={"/login"} className={"btn-primary text-black px-4 py-1.5 rounded-lg inline-block font-semibold"}>Join Now</NavLink>}

          </div>

          {/* Mobile Icon */}
          <MenuIcon className="md:hidden cursor-pointer" onClick={() => setOpen(true)} />
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md">
            <div className="absolute top-5 right-10">
              <X className="text-white cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-6 text-white text-xl">
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/programs" onClick={() => setOpen(false)}>Programs</Link>
              <Link to="/trainers" onClick={() => setOpen(false)}>Trainers</Link>
              <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <div
                onClick={() => setOpen(false)}
                className={`"btn-primary text-black text-xl"} px-4 py-2  rounded-xl `}>
                {userName ?
                  <NavLink to={"/profile"} className={({ isActive }) => isActive ? "text-primary flex gap-2 items-center" : "flex gap-2 items-center text-white"}>
                    {userData.userImage ? (
                      <img
                        src={userData.userImage}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <CircleUserRound
                        className="border-4 rounded-full border-[#FA8C38]"
                        size={80}
                      />
                    )}
                     <h1>Profile</h1>
                  </NavLink> :
                  <NavLink to={"/login"}>Join Now</NavLink>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Nav

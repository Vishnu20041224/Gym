import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MenuIcon, X, Dumbbell } from "lucide-react"

const Nav = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='w-full bg-black z-40'>
      <div className="max-w-6xl mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <div className='flex gap-2 items-center'>
            <Dumbbell className='p-2 btn-primary text-black rounded-sm max-md:hidden' size={35} color='black' />
            <Dumbbell className='p-1.5 btn-primary text-black rounded-sm md:hidden' size={25} color='black' />
            <h1 className='text-primary text-sm md:text-xl font-semibold'>Apex Athletics</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 ">
            <NavLink className={({ isActive }) => `text-sm md:text-lg ${isActive && "text-primary"}`} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => `text-sm md:text-lg ${isActive ? "text-primary" : ""}`} to="/programs">Programs</NavLink>
            <NavLink className={({ isActive }) => ` text-sm md:text-lg ${isActive ? "text-primary" : ""}`} to="/trainers">Trainers</NavLink>
            <NavLink className={({ isActive }) => ` text-sm md:text-lg ${isActive ? "text-primary" : ""}`} to="/contact">Contact</NavLink>
          </div>

          <button className="hidden md:block btn-primary px-4 py-1.5 rounded-3xl font-medium cursor-pointer text-black">
            Join Now
          </button>

          {/* Mobile Icon */}
          <MenuIcon
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md max-w-full">

            <div className="absolute top-5 right-10">
              <X
                className="text-white cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="flex flex-col items-center justify-center h-full  gap-6 text-white text-xl">
              <Link className='text-xl' to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link className='text-xl' to="/programs" onClick={() => setOpen(false)}>Programs</Link>
              <Link className='text-xl' to="/trainers" onClick={() => setOpen(false)}>Trainers</Link>
              <Link className='text-xl' to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <button className="btn-primary px-4 py-2 text-xl rounded-xl mt-4 text-black">
                Join Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Nav

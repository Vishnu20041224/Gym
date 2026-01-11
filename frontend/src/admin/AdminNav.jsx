import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MenuIcon, X, Dumbbell } from "lucide-react"
import { checkAuthenticatedUser } from '../utils/api'

const AdminNav = () => {
    const [open, setOpen] = useState(false)
    const [userName, setUserName] = useState(null)

    const getUser = async () => {
        try {
            const res = await checkAuthenticatedUser()
            if (res.data.success) {
                setUserName(res.data.user.name)
            }
        } catch (error) {
            console.log("User not logged in");
        }
    }

    useEffect(() => {
        getUser()
    }, [])

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
                    <Link to="/admin" className='flex gap-2 items-center'>
                        <Dumbbell className='p-2 btn-primary text-black rounded-sm max-md:hidden' size={35} />
                        <Dumbbell className='p-1.5 btn-primary text-black rounded-sm md:hidden' size={25} />
                        <h1 className='text-primary text-sm md:text-xl font-semibold'>
                            Apex Athletics
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6">
                        <NavLink to="/admin" end className={({ isActive }) => isActive ? "text-primary" : ""}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/class-schedule" className={({ isActive }) => isActive ? "text-primary" : ""}>
                            Class Schedule
                        </NavLink>

                        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "text-primary" : ""}>
                            Users
                        </NavLink>
                    </div>

                    {/* Desktop Button */}
                    <Link
                        to={"/login"}
                        className={`${userName ? "text-primary text-sm underline underline-offset-4" : "btn-primary text-black text-base"} font-semibold px-3.5 py-1 rounded-lg max-md:hidden`}
                    >
                        {userName || "Join Now"}
                    </Link>

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
                            <Link
                                to={"/login"}
                                className={`${userName ? "text-primary text-xl underline underline-offset-4" : "btn-primary text-black text-xl"} px-4 py-2  rounded-xl `}>
                                {userName || "Join Now"}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminNav

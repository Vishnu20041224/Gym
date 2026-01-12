import { CircleUserRound, Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import { cancelledSelectClassSchedule, checkAuthenticatedUser, getOneUser, getUserClassSchedule, logoutUser, updateProfile } from '../utils/api';
import { successfullyToast, warningToast } from '../lib/toast';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
const Profile = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const [userName, setUserName] = useState(null)

    const [openEdit, setOpenEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    let [classSchedule, setClassSchedule] = useState([])
    const [usersMap, setUsersMap] = useState({});

    let [isCanceling, setIsCanceling] = useState(false)

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true

        });
    };

    const cancelSchedule = async (sch) => {
        setIsCanceling(true)
        setClassSchedule((pres) => pres.filter((p) => p._id !== sch._id))
        await cancelledSelectClassSchedule(sch._id)
        setIsCanceling(false)
        successfullyToast("Cancel Schedule", "Cancel Class Schedule")
    }

    async function fetchData() {

        try {
            const user = await checkAuthenticatedUser()
            if (user.data.success) {
                setUserName(user.data.user.name)
                setUserData(user?.data?.user)
            }

            let res = await getUserClassSchedule()

            if (res.data.success) {
                const schedules = res.data.data;
                setClassSchedule(schedules);
                // fetch user names
                const users = {};
                await Promise.all(
                    schedules
                        .filter(sch => sch.userId)
                        .map(async (sch) => {
                            if (!users[sch.userId]) {
                                const userRes = await getOneUser(sch.userId);
                                users[sch.userId] = userRes.data.data.name;
                            }
                        })
                );

                setUsersMap(users);
            }
        } catch (error) {
            warningToast("User Data", error.message)
        }
    }


    async function logout() {
        try {
            await logoutUser()
            successfullyToast("Log Out", "Log Out Success Fully")
            navigate("/login")
        } catch (error) {
            warningToast("Log Out", error.message)
        }
    }

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("bio", e.target.bio.value);

        if (e.target.userImage.files[0]) {
            formData.append("userImage", e.target.userImage.files[0]);
        }

        try {
            const res = await updateProfile(formData);

            if (res.data.success) {
                setOpenEdit(false);
                setIsLoading(false)
                successfullyToast("Profile", "Profile updated successfully");

                // ✅ Update profile page immediately
                setUserData(res.data.data);
                setUserName(res.data.data.name);

                // ✅ Notify Navbar
                window.dispatchEvent(new Event("profile-updated"));

                // ✅ Close dialog

            }
        } catch (error) {
            setIsLoading(false)
            warningToast(
                "Profile",
                error.response?.data?.message || "Failed to update profile"
            );
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='min-h-[90vh] relative'>
            <div className='max-w-6xl mx-auto  flex gap-3 md:gap-5 lg:gap-7 items-center my-5'>
                <div >
                    {userData.userImage ?
                        <img className='w-26 h-26 rounded-full' src={userData.userImage} alt="" />
                        : <CircleUserRound className=' border-4 rounded-full border-[#FA8C38]' size={80} />}
                </div>
                <div>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>{userName}</h1>
                    <h4 className='text-primary my-1'>{userData.isMembership && "Premium Plus Member"}</h4>
                    <p className='text-gray-500'>{userData.bio || "Fitness enthusiast, always striving for new challenges"}</p>
                    <div className='mt-4 flex gap-3 items-center'>
                        <div className="mt-4 flex gap-3 items-center">
                            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                                <DialogTrigger asChild>
                                    <Button className="px-2 py-1 rounded-lg btn-primary text-white font-semibold">
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100">
                                    <form onSubmit={handleEditProfile}>
                                        <DialogHeader>
                                            <DialogTitle>Edit Profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when done.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-4">
                                            <div className="grid gap-3">
                                                <Label>Name</Label>
                                                <Input name="name" defaultValue={userData.name || ""} />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label>Bio</Label>
                                                <Input name="bio" defaultValue={userData.bio || ""} />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label>Profile Image</Label>
                                                <Input name="userImage" type="file" />
                                            </div>
                                        </div>

                                        <DialogFooter className="mt-4">
                                            <Button
                                                type="button"
                                                onClick={() => setOpenEdit(false)}
                                                className="bg-red-500"
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="bg-green-600">
                                                {isLoading ?
                                                    <span className='flex gap-2 items-center'>
                                                        <Loader /> Loading....
                                                    </span> : <span>Save changes</span>}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Button onClick={logout} className="px-2 py-1 rounded-lg btn-primary text-white font-semibold border border-white">Log Out</Button>
                        </div>
                    </div>
                </div>



            </div>

            {/* Upcoming Bookings */}

            {classSchedule.length > 0 && <div className='max-w-6xl mx-auto mt-10'>

                <h1 className='text-2xl font-semibold'>Your Class Schedule</h1>

                <div className="flex flex-col gap-5 justify-center items-center py-8 overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-gray-700 bg-gray-900 text-lg">
                                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold uppercase">Time</th>
                                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold uppercase">Class</th>
                                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold uppercase">Training Name</th>
                                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold uppercase">Booking Time</th>
                                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold uppercase">{isCanceling ? "Canceling" : "Cancelled"}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {classSchedule.map((sch) => (
                                sch?.userId && <tr key={sch._id} className="border-b border-gray-700 hover:bg-gray-900 cursor-pointer">
                                    <td className="py-3 px-4">{sch.time}</td>
                                    <td className="py-3 px-4 capitalize">{sch.class}</td>
                                    <td className="py-3 px-4">{sch.trainingName}</td>
                                    <td className="py-3 px-4">{formatTime(sch.updatedAt)}</td>
                                    <td className="py-3 px-4"><button onClick={() => cancelSchedule(sch)} className='rounded-md bg-red-700 text-white px-2 py-1 cursor-pointer hover:bg-red-600 hover:text-black'>Cancel Schedule</button></td>
                                </tr>))

                            }
                        </tbody>
                    </table>

                </div>

            </div>}

            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Loader className="animate-spin text-white" size={40} />
                </div>
            )}


        </div>
    )
}

export default Profile

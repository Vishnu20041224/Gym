import { useEffect } from 'react'
import { cancelledMailSelectClassSchedule, cancelledSelectClassSchedule, getAdminClassSchedule, getOneUser } from '../../utils/api';
import { useState } from 'react';
import { successfullyToast, warningToast } from '../../lib/toast';
import { Link } from 'react-router-dom';

const AdminClassSchedule = () => {

    let [classSchedule, setClassSchedule] = useState([])
    const [usersMap, setUsersMap] = useState({});

    async function getData() {
        try {
            const res = await getAdminClassSchedule();

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
                console.log(usersMap)
            }
        } catch (error) {
            console.log("error", error.message);
            warningToast("Class Schedule", error.message);
            setClassSchedule([]);
        }
    }



    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true

        });
    };

    let [isCanceling, setIsCanceling] = useState(false)


    const cancelSchedule = async (sch) => {
        console.log(sch)
        setIsCanceling(true)
        setClassSchedule((pres) => pres.filter((p) => p._id !== sch._id))
        await cancelledSelectClassSchedule(sch._id)
        await cancelledMailSelectClassSchedule(sch.userId, sch._id)
        setIsCanceling(false)
        successfullyToast("Cancel Schedule", "Cancel Class Schedule")
    }

    useEffect(() => {
        getData()
        console.log(classSchedule)
    }, [])

    return (
        <div className="max-w-6xl mx-auto py-6 md:py-8 lg:py-10">

            <div className="flex justify-center items-center flex-col gap-3 text-center pb-5">
                <h1 className="text-2xl lg:text-4xl font-medium">
                    Class Schedule Management
                </h1>
                <p>Manage and track user bookings across all training programs.</p>
            </div>

             <div className="flex flex-col gap-5 justify-center items-center py-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-gray-700 text-lg">
                            <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold uppercase">User</th>
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
                                <td className="py-3 px-4 uppercase">{usersMap[sch.userId] || "Loading..."}</td>
                                <td className="py-3 px-4">{sch.time}</td>
                                <td className="py-3 px-4 capitalize">{sch.class}</td>
                                <td className="py-3 px-4">{sch.trainingName}</td>
                                <td className="py-3 px-4">{formatTime(sch.updatedAt)}</td>
                                <td className="py-3 px-4"><button onClick={() => cancelSchedule(sch)} className='rounded-md bg-red-700 text-white px-2 py-1 cursor-pointer hover:bg-red-600 hover:text-black'>Cancel Schedule</button></td>
                            </tr>))}
                    </tbody>
                </table>

            </div>
            {/* :
            <div className='h-[50vh] w-full flex justify-center items-center'>
                <h1 className='text-4xl font-bold'>No Class Schedule</h1>
            </div>
            } */}
        </div>
    )
}

export default AdminClassSchedule

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getClassSchedule, mailSelectClassSchedule, postSelectClassSchedule } from '../utils/api';
import { successfullyToast, warningToast } from '../lib/toast';
const ClassSchedule = () => {


    const [classSchedule, setClassSchedule] = useState([])
    let [selectSchedule, setSelectSchedule] = useState(null);

    // loading 
    let [submitScheduleLoading, setSubmitScheduleLoading] = useState(false);

    const { classType } = useParams();

    async function fetchData() {
        try {
            console.log(classType);

            const res = await getClassSchedule(classType);
            console.log(res.data);

            setClassSchedule(res?.data?.data);
        } catch (error) {
            console.error("Error fetching class schedule:", error);
            warningToast("Class schedule", error.response?.data?.message || "Please try again later.");
        }
    }
    console.log(classType);

    const submitSchedule = async () => {
        try {
            if (!selectSchedule) {
                warningToast("Please select a schedule")
                return
            }

            if (!selectSchedule.available) {
                warningToast("Selected schedule is not available. Please choose another time.");
                return;
            }

            setSubmitScheduleLoading(true)
            let res = await postSelectClassSchedule(selectSchedule._id);

            await mailSelectClassSchedule(selectSchedule._id);
            setClassSchedule((prev) => prev.map((item) =>
                item._id === selectSchedule._id
                    ? { ...item, userId: res.data.userId, available: false }
                    : item
            ));
            setSubmitScheduleLoading(false)
            successfullyToast("successfully", res.data.message);



            console.log("Selected Schedule:", selectSchedule);
        } catch (error) {
            console.error("Error submitting schedule:", error);
            setSubmitScheduleLoading(false)
            warningToast("Error submitting schedule", "Error submitting schedule: Try aging Later")

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {/* chart */}
            <div className='px-3 max-w-6xl mx-auto flex justify-between items-center flex-col  py-6 md:py-8 lg:py-10'>
                {/* header */}

                <div className='text-center w-full mb-6'>
                    <h1 className='text-xl md:text-3xl lg:text-6xl font-semibold pb-3 md:pb-5 capitalize'>{classType} Class Schedule</h1>
                    <p className='font-normal text-xs md:text-lg lg:text-xl/6 pb-4 capitalize'>Book your 1-hour slots. Available hours are in green, unavailable/blocked hours are in gray.</p>
                </div>

                <div className='grid grid-cols-4 gap-3 max-w-4xl w-full mx-auto'>
                    {classSchedule.map((schedule, index) => (
                        <div onClick={() => setSelectSchedule(schedule)} key={index} className={`py-3 px-2 rounded-lg text-center font-semibold ${selectSchedule === schedule ? 'bg-green-500 text-white' : ''} ${schedule.available ? 'bg-gray-400 text-gray-600 hover:bg-green-400 cursor-pointer' : 'bg-red-800 text-white hover:bg-red-700 cursor-not-allowed '}`}>
                            <button disabled={!schedule.available}>{schedule.time}</button>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center items-center max-w-6xl w-full mt-6'>
                    <button onClick={submitSchedule} disabled={submitScheduleLoading} className='px-4 py-2 bg-[#FA8C38] text-black font-medium rounded-lg cursor-pointer'>{submitScheduleLoading ? "Loading..." : "Select Time"}</button>
                </div>
            </div>

        </>
    )
}

export default ClassSchedule

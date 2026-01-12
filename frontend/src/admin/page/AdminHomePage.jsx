import { Users, CalendarDays, ShieldUser } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminClassSchedule from '../AdminClassSchedule';
import { getAllClassSchedule, getAllUser, isAdmin } from '../../utils/api';
import axios from 'axios';
import { warningToast } from '../../lib/toast';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {

  const navigate = useNavigate()


  let [totalUser, setTotalUser] = useState(0)
  let [upcomingClasses, setUpcomingClasses] = useState(0)
  let [totalMembership, setTotalMembership] = useState(0)

  async function fetchData() {

    let user = await isAdmin()
    console.log(user.data)

    if (!user.data.user.isAdmin) {
      console.log("isAdmin", user.data.user.isAdmin)
      navigate("/")
      warningToast("warning", "Only for Admin Access")
    }

    let res = await getAllUser()
    setTotalMembership(res.data.data.filter((d) => d.isMembership).length)
    setTotalUser(res.data.data.length)
    let classSchedul = await getAllClassSchedule()
    setUpcomingClasses(classSchedul.data.data.filter((d) => d.available === false).length)



  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className=''>
      <div className='max-w-5xl mx-auto'>
        <h1 className='my-3 text-xl md:text-2xl capitalize font-semibold'>Metrics Overview</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 justify-center gap-2 md:gap-3 lg:gap-5'>

          <div className='bg-gray-900 p-3 md:p-5 lg:p-7 rounded-lg border border-gray-700'>
            <div className='flex justify-between items-center gap-3 text-gray-400 mb-3'>
              <h1 className=''>Total Users</h1>
              <h1><Users /></h1>
            </div>
            <h1 className='font-bold text-2xl'>{totalUser}</h1>

          </div>

          <div className='bg-gray-900 p-3 md:p-5 lg:p-7 rounded-lg border border-gray-700'>
            <div className='flex justify-between items-center gap-3 text-gray-400 mb-3'>
              <h1 className=''>Total Class Schedule</h1>
              <h1><CalendarDays /></h1>
            </div>
            <h1 className='font-bold text-2xl'>{upcomingClasses}</h1>
          </div>

          <div className='bg-gray-900 p-3 md:p-5 lg:p-7 rounded-lg border border-gray-700'>
            <div className='flex justify-between items-center gap-3 text-gray-400 mb-3'>
              <h1 className=''>Total membership</h1>
              <h1><ShieldUser /></h1>
            </div>
            <h1 className='font-bold text-2xl'>{totalMembership}</h1>
          </div>

        </div>
      </div>
      <AdminClassSchedule />
    </div>
  )
}

export default AdminHomePage

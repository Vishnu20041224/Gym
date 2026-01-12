import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Contact from './pages/Contact'
import Programs from './pages/Programs'
import Trainers from './pages/Trainers'
import Login from "./pages/Login"
import Signup from './pages/Signup'
import Footer from './components/Footer'
import ClassSchedule from './pages/ClassSchedule'
import AdminNav from "./admin/AdminNav"
import AdminHomePage from './admin/page/AdminHomePage'
import AdminClassSchedule from './admin/page/AdminClassSchedule'
import AllUser from './admin/page/AllUser'
import Profile from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  const location = useLocation();



  // hide footer on these pages
  const hideFooterRoutes = ["/login", "/signup"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith("/admin");



  return (
    <>
      {(!hideFooter && !isAdminRoute) && <Nav />}
      {isAdminRoute && <AdminNav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/programs' element={<Programs />} />
        <Route path='/trainers' element={<Trainers />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/class-schedule/:classType' element={<ClassSchedule />} />

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<AdminHomePage />} />
          <Route path="home" element={<AdminHomePage />} />
          <Route path="class-schedule" element={<AdminClassSchedule />} />
          <Route path="users" element={<AllUser/>} />
        </Route>

      </Routes>
      {(!hideFooter && !isAdminRoute) && <Footer />}
    </>
  )
}

export default App

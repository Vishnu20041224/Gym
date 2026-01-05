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
import Login from './pages/login'
import Signup from './pages/Signup'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  const location = useLocation();

  // hide footer on these pages
  const hideFooterRoutes = ["/login", "/signup"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);


  return (
    <>
      {!hideFooter && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/programs' element={<Programs />} />
        <Route path='/trainers' element={<Trainers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  )
}

export default App

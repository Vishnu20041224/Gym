import React from 'react'
import { Youtube, Facebook, Twitter, Instagram, Phone, Dumbbell, MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <div className='max-w-6xl mx-auto px-2 pt-6 md:pt-8 lg:pt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 justify-between max-md:justify-center items-start' >
        <div>
          <div className='flex gap-2 items-center pb-4'>
            <Dumbbell className='p-2 btn-primary text-black rounded-sm max-md:hidden' size={35} color='black' />
            <Dumbbell className='p-1.5 btn-primary text-black rounded-sm md:hidden' size={25} color='black' />
            <h1 className='text-primary text-sm md:text-xl lg:text-2xl font-semibold'>Apex Athletics</h1>
          </div>
          <p className='pb-4'>Your journey to peak performance starts here. Join the Apex Athletics community today!</p>
          <h1 className="flex gap-2 items-center mb-4">
            <MapPin color="#FA8C38" /> 123 Fitness Ave, Suite 400, Metropolis, MA 01234
          </h1>
          <h1 className="flex gap-2 items-center mb-4">
            <Phone color="#FA8C38" /> (555) 123-4567
          </h1>
          <h1 className="flex gap-2 items-center mb-4">
            <Mail color="#FA8C38" /> info@apexathletics.com
          </h1>
        </div>
        <div className='max-md:text-center'>
          <h1 className='pb-4 font-semibold text-2xl'>Programs</h1>
          <ul className='pb-4'>
            <li className='py-1'>Strength Training</li>
            <li className='py-1'>Cardio</li>
            <li className='py-1'>HIIT</li>
            <li className='py-1'>Vegan</li>
          </ul>
        </div>
        <div  className='max-md:text-center'>
          <h1 className='pb-4 font-semibold text-2xl'>Company</h1>
          <ul>
            <li className='py-1'>About Us</li>
            <li className='py-1'>Membership</li>
            <li className='py-1'>Testimonials</li>
            <li className='py-1'>FAQs</li>
          </ul>
        </div>
        <div >
          <h1 className='pb-4 font-semibold max-md:text-center text-2xl'>Connect With Us</h1>
          <div className='flex gap-3 items-center max-md:justify-center'>
            <Facebook />
            <Instagram />
            <Twitter />
            <Youtube />
          </div>
        </div>
      </div >
    </div >
  )
}

export default Footer

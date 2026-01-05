import React, { useState } from "react";
import { MapPin, Phone, Mail, Youtube, Facebook, Twitter, Instagram, Clock, } from "lucide-react";
const Contact = () => {

  // Send Us a Message

  const [sendMsg, setSendMsg] = useState({
    firstName: "", lastName: "", email: "", phoneNo: "", msg: ""
  })

  const onChangeMsg = (e) => {
    let { name, value } = e.target
    sendMsg[name] = value
  }

  const onSubmitMsg = (e) => {
    console.log(sendMsg)
  }

  return (

    <div className="">
      {/* map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2711892098187!2d80.1313544732093!3d12.954490915256963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fb0f8794059%3A0x95b8a406367df6b3!2s97%2C%20Chandra%20Nagar%20Main%20Rd%2C%20Nagappa%20Nagar%2C%20Chromepet%2C%20Chennai%2C%20Tamil%20Nadu%20600044!5e0!3m2!1sen!2sin!4v1767520836199!5m2!1sen!2sin"
        className="w-full h-[85vh] border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="py-6 md:py-8 lg:py-10 flex flex-col md:flex-row  justify-between gap-3 md:gap-6 lg:gap-10  max-w-6xl mx-auto p-2">
        <div className="flex-1">

          <div className="pb-4 md:pb-6 lg:mb-10">
            <h1 className="font-semibold text-2xl pb-4">Our Studio</h1>
            <h1 className="flex gap-2 items-center mb-4">
              <MapPin color="#FA8C38" /> 123 Fitness Ave, Suite 400, Metropolis, MA 01234
            </h1>
            <h1 className="flex gap-2 items-center mb-4">
              <Phone color="#FA8C38" /> (555) 123-4567
            </h1>
            <h1 className="flex gap-2 items-center mb-4">
              <Mail color="#FA8C38" /> info@apexathletics.com
            </h1>

            <h1 className="flex gap-2 items-start mb-4">
              <Clock color="#FA8C38" />
              <div className="flex flex-col gap-2">
                <span>Mon-Fri: 6:00 AM - 10:00 PM</span>
                <span>Sat-Sun: 8:00 AM - 8:00 PM</span>
              </div>
            </h1>
          </div>

          <div className="pb-4 md:pb-6 lg:mb-10">
            <h1 className="font-semibold text-2xl pb-4">Connect With Us</h1>

            <div className="flex flex-wrap gap-4">
              <h1 className="flex gap-2 items-center rounded-3xl px-2 py-1 md:px-4 md:py-1.5 lg:px-5 border border-gray-600"><Facebook /> Facebook</h1>
              <h1 className="flex gap-2 items-center rounded-3xl px-2 py-1 md:px-4 md:py-1.5 lg:px-5 border border-gray-600"><Instagram /> Instagram</h1>
              <h1 className="flex gap-2 items-center rounded-3xl px-2 py-1 md:px-4 md:py-1.5 lg:px-5 border border-gray-600"><Twitter /> Twitter</h1>
              <h1 className="flex gap-2 items-center rounded-3xl px-2 py-1 md:px-4 md:py-1.5 lg:px-5 border border-gray-600"><Youtube /> Youtube</h1>

            </div>
          </div>

          <div className="pb-4 md:pb-6 lg:mb-10">
            <h1 className="font-semibold text-2xl pb-4">Quick Actions</h1>

            <button className="w-full btn-primary text-center py-1 lg:py-1.5 px-3 md:px-4 lg:px-5 text-black rounded-2xl cursor-pointer font-medium mb-5">Join Apex Now</button>
            <h1 className="text-primary pb-3">View Class Schedule</h1>
            <h1 className="text-primary pb-3">Read Our FAQs</h1>
          </div>

        </div>
        <div className="flex-1">

          <h1 className="font-semibold text-2xl pb-4">Send Us a Message</h1>

          <div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col gap-2 mb-3 lg:mb-4">
                <label htmlFor="FirstName" className="text-gray-300 text-sm">First Name</label>
                <input onChange={onChangeMsg} className="px-3 py-1.5 rounded-xl border border-gray-600 outline-none text-sm" type="text" id="FirstName" name="firstName" placeholder="Vishnu" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="LastName" className="text-gray-300 text-sm">Last Name</label>
                <input onChange={onChangeMsg} className="px-3 py-1.5 rounded-xl border border-gray-600 outline-none text-sm" type="text" id="LastName" name="lastName" placeholder="Shankar" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-3 lg:mb-4">
              <label htmlFor="email" className="text-gray-300 text-sm">Email Address</label>
              <input onChange={onChangeMsg} className="px-3 py-1.5 rounded-xl border border-gray-600 outline-none text-sm" type="email" id="email" name="email" placeholder="vishnushankar@gmail.com" />
            </div>

            <div className="flex flex-col gap-2 mb-3 lg:mb-4">
              <label htmlFor="phoneNo" className="text-gray-300 text-sm">Phone Number (Optional)</label>
              <input onChange={onChangeMsg} className="px-3 py-1.5 rounded-xl border border-gray-600 outline-none text-sm" type="number" id="phoneNo" name="phoneNo" placeholder="1234567890" />
            </div>

            <div className="flex flex-col gap-2 mb-3 lg:mb-4">
              <label htmlFor="msg" className="text-gray-300 text-sm">Your Message</label>
              <textarea onChange={onChangeMsg} className="px-3 py-1.5 rounded-xl border border-gray-600 outline-none text-sm max-h-20 " type="number" name="msg" id="msg" placeholder="Tell us how we can help..." />
            </div>

            <button onClick={onSubmitMsg} className="w-full btn-primary text-center py-1 lg:py-1.5 px-3 md:px-4 lg:px-5 text-black rounded-2xl cursor-pointer font-medium mb-5">Submit Message</button>
          </div>

        </div>
      </div>

    </div>

  );
};

export default Contact;

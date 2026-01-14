import { useEffect, useState } from "react";
import HeroPage from "../components/Heropage";
import hiitIcon from "../assets/icone/hiit.png";

import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, Dumbbell, LeafyGreen, Check, MapPin, Phone, Mail } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  getTrainers,
  getSchedule,
  getMembershipPlans,
  getTestimonials,
  checkAuthenticatedUser,
  paymentVerify,
  getInTouch,
} from "../utils/api";

import axios from "axios"
import { successfullyToast, warningToast } from "../lib/toast";
const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ourTraining = [
    {
      icon: HeartPulse,
      title: "Strength Training",
      msg: "Build muscle, increase power, and enhance your overall physical strength with our expertly designed programs.",
      link: "/",
      type: "component",
    },
    {
      icon: Dumbbell,
      title: "Cardio & Endurance",
      msg: "Improve cardiovascular health, boost stamina, and burn calories with dynamic and engaging cardio workouts.",
      link: "/",
      type: "component",
    },
    {
      icon: hiitIcon,
      title: "HIIT & Agility",
      msg: "Experience high-intensity interval training for maximum fat loss, increased speed, and explosive athletic performance.",
      link: "/",
      type: "image",
    },
    {
      icon: LeafyGreen,
      title: "Vegan & Flexibility",
      msg: "Enhance flexibility, improve balance, and reduce stress with our comprehensive yoga and mobility classes.",
      link: "/",
      type: "component",
    },
  ];


  let [trainers, setTrainers] = useState([])
  let [schedule, setSchedule] = useState([])
  let [membershipPlans, setMembershipPlans] = useState([])
  let [testimonials, setTestimonials] = useState([])

  // fetch data from DB
  async function getData() {
    try {

      console.log("fetching data");
      const [
        trainersRes,
        scheduleRes,
        membershipRes,
        testimonialsRes,
      ] = await Promise.all([
        getTrainers(),
        getSchedule(),
        getMembershipPlans(),
        getTestimonials(),
      ]);

      setTrainers(trainersRes.data.data);
      setSchedule(scheduleRes.data.data);
      setMembershipPlans(membershipRes.data.data);
      setTestimonials(testimonialsRes.data.data);
      console.log("data fetched");




    } catch (error) {
      warningToast("Error", "Failed to fetch data");
      console.log("error fetching data", error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Tailwind md breakpoint is 768px
      setIsLaptop(window.innerWidth >= 768);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Send Us a Message

  const [form, setForm] = useState({
    name: "",
    email: "",
    msg: "",
  });

  let [submitMsgLoading, setSubmitMsgLoading] = useState(false);

  const onChangeMsg = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitMsg = async () => {
    try {
      setSubmitMsgLoading(true)
      const res = await getInTouch(form);
      if (!res.data.success) return warningToast("Mail", "Failed to send message");

      setSubmitMsgLoading(false)
      successfullyToast("Mail", res.data.message || "Message sent successfully");
      setForm({
        name: "",
        email: "",
        msg: "",
      });

    } catch (err) {
      warningToast("Mail", err.response?.data?.message || "Failed to send message");
    }
  };



  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const [paymentImage, setPaymentImage] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paidAmount, setPaidAmount] = useState(null);
  const [membership, setMembership] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [paymentTimerId, setPaymentTimerId] = useState(null);

  const payMembership = async (member) => {
    try {

      // 🔐 check auth via backend
      await checkAuthenticatedUser()

      const YOUR_UPI_ID = "rhvishnushankar@oksbi";
      const YOUR_NAME = "Vishnu Shankar";

      const upiLink = `upi://pay?pa=${YOUR_UPI_ID}&pn=${encodeURIComponent(
        YOUR_NAME
      )}&am=${member.amount}&cu=INR`;

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        upiLink
      )}`;

      setQrCodeUrl(qrUrl);
      setPaidAmount(member.amount);
      setMembership(member)
      setShowQR(true);
      setPaymentImage(null)
      setPaymentStatus(""); // Reset previous status
      setTimeLeft(180); // Start countdown from 60 seconds

      if (paymentTimerId) clearInterval(paymentTimerId);


      // Start 1-minute timer
      const timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            setShowQR(false);
            setPaymentStatus("⏰ Payment session expired. Please try again.");
            setPaymentImage(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setPaymentTimerId(timerId);
    } catch (error) {
      warningToast("Login required", "Please login to proceed with payment");
      navigate("/login");
    }
  };

  const handleImageUpload = (e) => {
    setPaymentImage(e.target.files[0]);
  };


  const submitPaymentProof = async () => {
    if (!paymentImage) {
      setPaymentStatus("⚠️ Please upload payment screenshot");
      return;
    }

    const now = new Date();

    const formatTime = (date) =>
      date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).replace(",", "").replace("AM", "am").replace("PM", "pm");

    const formData = new FormData();
    formData.append("image", paymentImage);
    formData.append("paymentTime", formatTime(now));
    formData.append("paymentTimePlus1Min", formatTime(new Date(now.getTime() + 60000)));
    formData.append("paymentTimePlus2Min", formatTime(new Date(now.getTime() + 120000)));
    formData.append("membershipPlan", membership.planType);
    formData.append("amount", membership.amount);

    try {
      const res = await paymentVerify(formData);

      if (!res.data.success) {
        setPaymentStatus(res.data.message);
        warningToast("payment", res.data.message || "UPI ID or payment time not Matched in screenshot")
        return;
      }

      successfullyToast("Payment", "Payment verified successfully!");
      setPaymentStatus("✅ Payment submitted for verification");
      setShowQR(false);
      setPaymentImage(null);

      if (paymentTimerId) clearInterval(paymentTimerId);
      setTimeLeft(0);

    } catch (error) {
      console.error("Error uploading payment screenshot:", error);
      setPaymentStatus("❌ Failed to submit payment. Try again.");
    }
  };


  return (
    <div className="">
      <HeroPage />

      {/* About Section */}
      <div className="max-w-6xl mx-auto py-10 md:py-16 lg:py-20">
        <div className="flex justify-center items-center flex-col gap-3 text-center">
          <h1 className="text-2xl lg:text-4xl font-medium">
            About Apex Athletics
          </h1>
          <p>Our Mission: Empowering You Towards Peak Performance.</p>

        </div>

        <div className="flex gap-6 items-center flex-col md:flex-row py-5 md:py-8 lg:py-10 px-2 text-sm md:text-base">
          <div data-aos="fade-up" className="flex-1">
            <p>
              At Apex Athletics, we believe in pushing boundaries. Our
              state-of-the-art facility and expert trainers are dedicated to
              helping you achieve your fitness goals.
            </p>

            <p className="py-5 md:py-8">
              Our community is built on mutual support, motivation, and a shared
              passion for a healthier, stronger life.
            </p>

            <Link to="/trainers" className="btn-primary text-black px-4 py-2 rounded-2xl font-medium">
              Meet Our Trainers
            </Link>
          </div>

          <div data-aos="fade-up" className="flex-1">
            {/* <img src={aboutImg} alt="About Apex Athletics" /> */}
            <img src={"https://res.cloudinary.com/dlpti92vt/image/upload/v1767850008/about_zhhmpj.png"} className="rounded-xl" alt="About Apex Athletics" />
          </div>
        </div>
      </div>



      {/* Our Training Programs */}
      <div className="max-w-6xl mx-auto py-6 md:py-8 lg:py-10">
        <div className="flex justify-center items-center flex-col gap-3 text-center">
          <h1 className="text-2xl lg:text-4xl font-medium">
            Our Training Programs
          </h1>
          <p>Diverse Disciplines for Every Fitness Goal.</p>
        </div>

        <div className="flex gap-6 items-stretch flex-col md:flex-row py-5 md:py-8 lg:py-16 px-2 text-sm md:text-base">
          {ourTraining.map((training, index) => (
            <div
              data-aos="flip-down"
              data-aos-duration="2000"
              data-aos-delay={index * 300}
              key={index}
              className="flex flex-col justify-center items-center gap-3 text-center p-4 rounded-xl"
            >
              {training.type === "component" ? (
                <training.icon size={40} className="text-primary" />
              ) : (
                <img src={training.icon} alt={training.title} className="w-10 h-10" />
              )}

              <h2 className="font-semibold py-4">{training.title}</h2>

              <p className="py-">{training.msg}</p>

              <Link className="pt-8" to={"/programs"} >
                <button className="px-4 py-2 border border-[#FA8C38] text-primary rounded-xl cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Our Expert Trainers */}

      <div className="max-w-6xl mx-auto py-6 md:py-8 lg:py-10">
        <div className="flex justify-center items-center flex-col gap-3 text-center pb-5">
          <h1 className="text-2xl lg:text-4xl font-medium">
            Meet Our Expert Trainers
          </h1>
          <p>Guiding You Every Step of the Way.</p>
        </div>

        <div className="flex gap-6 items-stretch flex-col md:flex-row py-5 md:py-8 lg:py-16 px-2 text-sm md:text-base">

          {trainers.map((trani, index) => (

            <div data-aos="flip-left"
              data-aos-duration="2000"
              data-aos-delay={index * 300}
              className="relative" key={index}>
              <img src={trani.image} alt="" className=" rounded-xl " />
              <div className="top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 absolute w-full text-center">
                <h1 className="text-xl font-semibold ">{trani.name}</h1>
                <h1 className="py-2 text-primary text-sm">{trani.type}</h1>
                <div className="flex justify-center items-center">
                  <button className="btn-primary text-center text-black py-1 px-2 rounded-xl cursor-pointer font-medium text-sm"><Link to={"/trainers"}>View more </Link></button>
                </div>
              </div>
            </div>))}

        </div>

      </div>


      {/* Class Schedule Snippet */}

      <div className="max-w-xl mx-auto py-6 md:py-8 lg:py-10">

        <div className="flex justify-center items-center flex-col gap-3 text-center pb-5">
          <h1 className="text-2xl lg:text-4xl font-medium">
            Class Schedule Snippet
          </h1>
          <p>Find Your Next Workout.</p>
        </div>

        <div className="flex flex-col gap-5 justify-center items-center py-8">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold">Time</th>
                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold">Class</th>
                <th className="py-3 px-4 md:px-2 lg:px-4 font-semibold">Instructor</th>
              </tr>
            </thead>

            <tbody>
              {schedule.map((sch) => (
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">{sch.time}</td>
                  <td className="py-3 px-4">{sch.class}</td>
                  <td className="py-3 px-4">{sch.instructor}</td>
                </tr>))}
            </tbody>
          </table>

          <Link to={"/programs"} className="text-primary border border-[#FA8C38] rounded-xl px-3 py-1.5 cursor-pointer">View Full Schedule</Link>
        </div>

      </div>

      {/* Membership Plans */}

      <div className="max-w-6xl mx-auto py-6 md:py-8 lg:py-10">

        <div className="flex justify-center items-center flex-col gap-3 text-center pb-5">
          <h1 className="text-2xl lg:text-4xl font-medium">
            Membership Plans
          </h1>
          <p>Choose the Plan That's Right for You.</p>
        </div>


        <div className="py-15 max-w-7xl mx-auto">
          <div className="grid  grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {membershipPlans.map((member, index) => (
              <div
                data-aos="zoom-out"
                data-aos-duration="2000"
                data-aos-delay={index * 300}
                key={index}
                className={`rounded-xl text-center flex flex-col gap-4 hover:shadow-lg transition p-4 m-2 ${index % 2 !== 0 && "bg-[#682F03]"}`}
              >
                <h1 className="text-xl font-semibold">
                  {member.planType}
                </h1>

                <div>
                  <h1 className="text-3xl text-primary font-bold">
                    ₹{member.amount}
                  </h1>
                  <p className="text-sm text-gray-500">/ month</p>
                </div>

                <div className="flex flex-col gap-2 text-left mt-3">
                  {member.about.map((a, i) => (
                    <p key={i} className="flex gap-2 items-center">
                      <Check size={18} className="text-primary" />
                      {a}
                    </p>
                  ))}
                </div>

                <button onClick={() => payMembership(member)} className="mt-auto px-4 py-2 border border-gray-800 hover:bg-[#FA8C38] hover:text-black rounded-md transition">
                  Pay Now
                </button>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PAYMENT */}

      {showQR && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl text-center relative w-[90%] max-w-md">

            <button
              onClick={() => setShowQR(false)}
              className="absolute top-2 right-3 text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-2">Complete Your Payment</h2>

            <p className="text-sm text-gray-600 mb-3">
              Pay <span className="font-bold">₹{paidAmount}</span> to
              <br />
              <span className="font-semibold">rhvishnushankar@oksbi</span>
            </p>

            <img src={qrCodeUrl} alt="UPI QR Code" className="mx-auto mb-4" />

            <p className="text-xs text-gray-500 mb-3">
              After successful payment, upload the screenshot below for verification.
            </p>

            <p className="text-sm font-medium text-red-500 mb-2">
              ⏱ Time left: {timeLeft} sec
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-3 w-full text-black bg-gray-500 py-1 px-2 rounded-sm cursor-pointer"
            />

            {paymentStatus && (
              <p className="text-sm mb-2 text-gray-500">{paymentStatus}</p>
            )}

            <button
              onClick={submitPaymentProof}
              className="w-full py-2 bg-[#FA8C38] text-black rounded-md font-medium"
            >
              Submit Payment Proof
            </button>

            {/* <p className="text-xs text-gray-500 mt-2">
              ⚠️ Membership will be activated after verification
            </p> */}
          </div>
        </div>
      )}


      {/* Transformations & Testimonials */}

      <div className="max-w-6xl mx-auto py-6 md:py-8 lg:py-10">

        <div className="flex justify-center items-center flex-col gap-3 text-center pb-5">
          <h1 className="text-2xl lg:text-4xl font-medium">
            Transformations & Testimonials
          </h1>
          <p>Real Stories, Real Results.</p>
        </div>


        <div className="flex gap-6 items-stretch flex-col md:flex-row py-5 md:py-8 lg:py-16 px-2 text-sm md:text-base">
          {testimonials.map((test, index) => (

            <div className="relative" key={index}
              data-aos="zoom-in-down"
              data-aos-duration="2000"
              data-aos-delay={index * 300}
            >
              <img src={test.image} alt="" className=" rounded-xl " />
              <div className="top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 absolute w-full text-center">
                <h1 className="text-sm/6  tracking-wide">{test.msg}</h1>
                <h1 className="py-2 text-primary text-sm font-semibold">{test.name}</h1>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Get in Touch */}


      <div className="max-w-6xl mx-auto py-10 md:py-16 lg:py-20">
        <div className="flex justify-center items-center flex-col gap-3 text-center pb-6">
          <h1 className="text-2xl lg:text-4xl font-medium">Get in Touch</h1>
          <p>We're Here to Help You Achieve Your Goals.</p>
        </div>

        <div
          className="flex-1 flex gap-6 items-start flex-col md:flex-row py-5 md:py-8 lg:py-10 px-2 text-sm md:text-base"
          data-aos="fade-up"
          data-aos-duration="2000">



          <div className="flex-1 w-full">
            <h1 className="pb-5 font-semibold text-2xl">Send Us a Message</h1>

            <div className="flex flex-col gap-4">
              <input
                name="name"
                value={form.name}
                onChange={onChangeMsg}
                placeholder="Your Name"
                className="bg-[#565d6d] text-white py-2 px-3 rounded"
              />

              <input
                name="email"
                value={form.email}
                onChange={onChangeMsg}
                placeholder="Your Email"
                className="bg-[#565d6d] text-white py-2 px-3 rounded"
              />

              <textarea
                name="msg"
                value={form.msg}
                onChange={onChangeMsg}
                placeholder="Your Message"
                className="bg-[#565d6d] text-white py-2 px-3 rounded"
              />

              <button
                onClick={onSubmitMsg}
                className="btn-primary py-2 rounded cursor-pointer text-black font-medium"
              >
                {submitMsgLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="flex-1">
            <h1 className="pb-5 font-semibold text-xl md:text-xl lg:text-2xl">Find Us</h1>
            <h1 className="flex gap-2 items-center mb-4">
              <MapPin color="#FA8C38" /> Chromepet, Chennai, Tamil Nadu 600044
            </h1>
            <h1 className="flex gap-2 items-center mb-4">
              <Phone color="#FA8C38" />9176017127
            </h1>
            <h1 className="flex gap-2 items-center mb-4">
              <Mail color="#FA8C38" /> rhvishnushankar@gamil.com
            </h1>
            <img className="p-1 rounded-2xl" src={"https://res.cloudinary.com/dlpti92vt/image/upload/v1767850009/find_n7i4or.png"} alt="find" />
          </div>





        </div>
      </div>



    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import HeroPage from "../components/Heropage";
import aboutImg from "../assets/img/about.png";
import hiitIcon from "../assets/icone/hiit.png";
import { Link } from "react-router-dom";
import { HeartPulse, Dumbbell, LeafyGreen, Check, MapPin, Phone, Mail } from "lucide-react";
import jhon from "../assets/img/jhon.png"
import Smith from "../assets/img/Smith.png"
import Johnson from "../assets/img/Johnson.png"
import Sarah from "../assets/img/Sarah.png"
import Mark from "../assets/img/Mark.png"
import Jessica from "../assets/img/Jessica.png"
import find from "../assets/img/find.png"

import AOS from "aos";
import "aos/dist/aos.css";

import axios from "axios"
const Home = () => {
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

  const trainers = [
    {
      name: "John 'The Iron' Doe",
      type: "Strength & Powerlifting",
      link: "/",
      image: jhon
    },
    {
      name: "Jane 'The Agile' Smith",
      type: "HIIT & Functional Fitness",
      link: "/",
      image: Smith
    },
    {
      name: "Mike 'The Zen' Johnson",
      type: "Vegan & Mobility",
      link: "/",
      image: Johnson
    }
  ]

  const schedule = [
    {
      time: "6:00 AM",
      class: "Morning HIIT",
      instructor: "Jane Smith"
    },
    {
      time: "9:00 AM",
      class: "Power Vegan",
      instructor: "Mike Johnson"
    },
    {
      time: "5:30 PM",
      class: "Strength Builder",
      instructor: "John Doe"
    }
  ]

  const membershipPlans = [
    {
      planType: "Basic Access",
      amount: 1,
      about: [
        "Full Gym Access",
        "Locker Room",
        "Basic Classes",
        "Online Portal"
      ],
      choose: "Choose Basic",
      link: "/"
    },
    {
      planType: "Premium Plus",
      amount: 1999,
      about: [
        "All Basic Features",
        "Unlimited Classes",
        "Personal Training (1/month)",
        "Nutritional Guidance",
        "Priority Booking"
      ],
      choose: "Choose Premium",
      link: "/"
    },
    {
      planType: "Elite Transformation",
      amount: 3999,
      about: [
        "All Basic Features",
        "Unlimited Personal Training",
        "Custom Meal Plans",
        "24/7 Trainer Support",
        "Exclusive Workshops"
      ],
      choose: "Choose Elite",
      link: "/"
    },

  ]

  const testimonials = [
    {
      msg: "Apex Athletics completely changed my life. The trainers are incredible, and the community is so supportive!",
      name: "- Sarah K.",
      image: Sarah

    },
    {
      msg: "I've never been stronger. The personalized programs pushed me beyond what I thought was possible.",
      name: "- Mark T.",
      image: Mark

    },
    {
      msg: "My mind and body are more connected than ever. The yoga classes are a perfect balance of challenge and calm.",
      name: "- Jessica L.",
      image: Jessica
    }
  ]

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

  const [sendMsg, setSendMsg] = useState({
    name: "", email: "", msg: ""
  })

  const onChangeMsg = (e) => {
    let { name, value } = e.target
    sendMsg[name] = value
  }

  const onSubmitMsg = (e) => {
    console.log(sendMsg)
  }

  // const payMembership = () => {
  //   const YOUR_UPI_ID = "rhvishnushankar@oksbi";
  //   const YOUR_NAME = "Vishnu Shankar";

  //   const getUpiLink = (amount) => {
  //     return `upi://pay?pa=${YOUR_UPI_ID}&pn=${encodeURIComponent(
  //       YOUR_NAME
  //     )}&am=${amount}&cu=INR`;
  //   };

  //   const getQRCodeUrl = (amount) => {
  //     return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
  //       getUpiLink(amount)
  //     )}`;
  //   };

  //   // example usage
  //   const amount = 499;
  //   const upiLink = getUpiLink(amount);
  //   const qrCodeUrl = getQRCodeUrl(amount);

  //   console.log(upiLink);
  //   console.log(qrCodeUrl);

  //   return(
  //     <div className="h-screen w-full flex justify-center items-center bg-black/40">
  //       <img className="max-w-3xs aspect-square" src={qrCodeUrl} alt="" />
  //     </div>
  //   )
  // };

  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const [paymentImage, setPaymentImage] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paidAmount, setPaidAmount] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [paymentTimerId, setPaymentTimerId] = useState(null);

  const payMembership = (amount) => {
    const YOUR_UPI_ID = "rhvishnushankar@oksbi";
    const YOUR_NAME = "Vishnu Shankar";

    const upiLink = `upi://pay?pa=${YOUR_UPI_ID}&pn=${encodeURIComponent(
      YOUR_NAME
    )}&am=${amount}&cu=INR`;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      upiLink
    )}`;

    setQrCodeUrl(qrUrl);
    setPaidAmount(amount);
    setShowQR(true);
    setPaymentImage(null)
    setPaymentStatus(""); // Reset previous status
    setTimeLeft(59); // Start countdown from 60 seconds

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

  };

  const handleImageUpload = (e) => {
    setPaymentImage(e.target.files[0]);
  };

  const submitPaymentProof = async () => {
    if (!paymentImage) {
      setPaymentStatus("⚠️ Please upload payment screenshot");
      return;
    }

    const formData = new FormData();
    formData.append("image", paymentImage);

    const res = await axios.post(
      "http://localhost:3000/api/payment/verify-payment",
      formData
    );

    setPaymentStatus(res.data.message);
    // Later you will send this to backend
    console.log(res.data)

    if (!res.data.success) {
      alert(res.data.message);
    }

    setPaymentStatus("✅ Payment submitted for verification");
    setShowQR(false)
    setPaymentImage(null);

    // Stop countdown timer
    if (paymentTimerId) clearInterval(paymentTimerId);
    setTimeLeft(0);

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

            <button className="btn-primary text-black px-4 py-2 rounded-2xl font-medium">
              Meet Our Trainers
            </button>
          </div>

          <div data-aos="fade-up" className="flex-1">
            <img src={aboutImg} alt="About Apex Athletics" />
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

              <Link className="pt-8" to={training.link} >
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
                  <button className="btn-primary text-center text-black py-1 px-2 rounded-xl cursor-pointer font-medium text-sm"><Link to={trani.link}>View Profile </Link></button>
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

          <button className="text-primary border border-[#FA8C38] rounded-xl px-3 py-1.5 cursor-pointer">View Full Schedule</button>
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

                <button onClick={() => payMembership(member.amount)} className="mt-auto px-4 py-2 border border-gray-800 hover:bg-[#FA8C38] hover:text-black rounded-md transition">
                  Choose Plan
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

            <p className="text-xs text-gray-500 mt-2">
              ⚠️ Membership will be activated after verification
            </p>
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
        <div className="flex justify-center items-center flex-col gap-3 text-center pb-3 md:pb-6 lg:pb-9">
          <h1 className="text-2xl lg:text-4xl font-medium">
            Get in Touch
          </h1>
          <p className="text-xm md:text-base">We're Here to Help You Achieve Your Goals.</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="2000"

          className="flex gap-6 items-start flex-col md:flex-row py-5 md:py-8 lg:py-10 px-2 text-sm md:text-base">
          <div className="flex-1 w-full">
            <h1 className="pb-5 font-semibold text-xl md:text-xl lg:text-2xl">Send Us a Message</h1>
            <div className="flex flex-col gap-4">
              <input onChange={onChangeMsg} className="bg-[#565d6d] text-white py-1.5 px-2 rounded-md" type="text" name="name" placeholder="Your Name" />
              <input onChange={onChangeMsg} className="bg-[#565d6d] text-white py-1.5 px-2 rounded-md" type="text" name="email" placeholder="Your Email" />
              <textarea onChange={onChangeMsg} className="bg-[#565d6d] text-white py-1.5 px-2 rounded-md max-h-20" name="msg" id="" placeholder="Your Message" />
              <button onClick={onSubmitMsg} className="py-1.5 px-2 btn-primary rounded-md cursor-pointer">Send Message</button>
            </div>
          </div>


          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="flex-1 ">
            <h1 className="pb-5 font-semibold text-xl md:text-xl lg:text-2xl">Find Us</h1>
            <h1 className="flex gap-2 items-center mb-4">
              <MapPin color="#FA8C38" /> 123 Fitness Ave, Suite 400, Metropolis, MA 01234
            </h1>
            <h1 className="flex gap-2 items-center mb-4">
              <Phone color="#FA8C38" /> (555) 123-4567
            </h1>
            <h1 className="flex gap-2 items-center mb-4">
              <Mail color="#FA8C38" /> info@apexathletics.com
            </h1>
            <img className="p-1 rounded-2xl" src={find} alt="find" />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;

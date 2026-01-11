import mongoose from "mongoose";
import OurTrainingModel from "../model/ourTrainingModel.js";
import TrainerSchema from "../model/trainersModel.js"
import ScheduleItems from "../model/scheduleModel.js"
import MembershipPlans from "../model/membershipPlansModel.js"
import Testimonials from "../model/testimonialsModel.js"
import Coachs from "../model/coachsModel.js";
import ClassSchedule from "../model/classScheduleModel.js";


const ourTraining = [
  {
    icon: "HeartPulse",
    title: "strength",
    msg: "Build muscle, increase power, and enhance your overall physical strength with our expertly designed programs.",
    link: "/",
    type: "component",
  },
  {
    icon: "Dumbbell",
    title: "cardio & Endurance",
    msg: "Improve cardiovascular health, boost stamina, and burn calories with dynamic and engaging cardio workouts.",
    link: "/",
    type: "component",
  },
  {
    icon: "hiitIcon",
    title: "HIIT & Agility",
    msg: "Experience high-intensity interval training for maximum fat loss, increased speed, and explosive athletic performance.",
    link: "/",
    type: "image",
  },
  {
    icon: "LeafyGreen",
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
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/jhon_gf6vdp.png"
  },
  {
    name: "Jane 'The Agile' Smith",
    type: "HIIT & Functional Fitness",
    link: "/",
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/Smith_h4rxn9.png"
  },
  {
    name: "Mike 'The Zen' Johnson",
    type: "Vegan & Mobility",
    link: "/",
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850008/Johnson_uniim7.png"
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
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/Sarah_sbg7qv.png"

  },
  {
    msg: "I've never been stronger. The personalized programs pushed me beyond what I thought was possible.",
    name: "- Mark T.",
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850008/Mark_aous6n.png"

  },
  {
    msg: "My mind and body are more connected than ever. The yoga classes are a perfect balance of challenge and calm.",
    name: "- Jessica L.",
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/Jessica_y67hzi.png"
  }
]

// coachs
const coachs = [
  {
    name: "Samantha Lee",
    type: "strength",
    msg: "Samantha is a certified strength coach dedicated to helping clients build power, endurance, and",
    certifications: ["CSCS", "NASM-CPT", "Precision Nutrition"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850009/Samantha_fliopa.png"
  },
  {
    name: "Michael Chen",
    type: "cardio", //HIIT & 
    msg: "Michael's high-energy HIIT sessions are designed to push limits and maximize calorie burn, making",
    certifications: ["ACSM-CPT", "Kettlebell Level 1", "TRX Certified"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850008/Michael_ddg4tj.png"
  },
  {
    name: "Jessica White",
    type: "yoga",
    msg: "Jessica's holistic approach to yoga focuses on mindful movement, improving flexibility, balance, and inner peace. She helps clients connect mind and body.",
    certifications: ["RYT 500", "Yoga Alliance Certified", "Pilates Instructor"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850010/JessicaWhite_zezey3.png"
  },
  {
    name: "David Kim",
    type: "functional-training",
    msg: "David specializes in movements that improve everyday strength and prevent injury, helping clients move better and live healthier. He emphasizes practical strength.",
    certifications: ["ACE-CPT", "FMS Certified", "Corrective Exercise"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850009/David_hjgozt.png"
  },
  {
    name: "Emily Rodriguez",
    type: "hiit",
    msg: "Emily combines fitness coaching with nutritional guidance to empower clients to achieve sustainable health and body transformations. Her approach is holistic and sustainable.",
    certifications: ["ISSN-SNS", "NASM-WLS", "Certified Health Coach"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850009/Emily_uzkk9f.png"
  },
  {
    name: "Chris Evans",
    type: "weight-management",
    msg: "Chris provides personalized strategies for effective weight loss and muscle gain, focusing on long-term lifestyle changes. He helps build habits for lasting success.",
    certifications: ["NSCA-CPT", "ISSA-CFT", "Weight Loss Specialist"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850008/Chris_v5q6ga.png"
  },
  {
    name: "Olivia Grace",
    type: "post-natal-fitness",
    msg: "Olivia supports mothers through safe and effective fitness routines tailored for pregnancy and postpartum recovery. She ensures a supportive and nurturing environment.",
    certifications: ["Pre/Postnatal Cert", "CPPC", "Women's Fitness Specialist"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850008/Olivia_hkuo59.png"
  },
  {
    name: "Daniel Wong",
    type: "sports-performance",
    msg: "Daniel helps athletes enhance their agility, speed, and power, optimizing performance for competitive sports. He customizes training for peak athletic output.",
    certifications: ["CSCS", "USA Weightlifting", "Functional Movement"],
    image: "https://res.cloudinary.com/dlpti92vt/image/upload/v1767850009/Daniel_mihr6p.png"
  },
]

// classSchedule  strength
const classSchedule = [
  {
    time: "6 AM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "7 AM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "8 AM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "9 AM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "10 AM",
    available: false,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "11 AM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "12 PM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "1 PM",
    available: false,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "2 PM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "3 PM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "4 PM",
    available: false,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "5 PM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },

  {
    time: "6 PM",
    available: false,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "7 PM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "8 PM",
    available: true,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },
  {
    time: "9 PM",
    available: false,
    class: "strength",
    userId: null,
    trainingName: "Samantha Lee"
  },

  //  cardio
  {
    time: "6 AM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "7 AM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "8 AM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "9 AM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "10 AM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "11 AM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "12 PM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "1 PM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "2 PM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "3 PM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "4 PM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "5 PM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "6 PM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "7 PM",
    available: true,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "8 PM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  {
    time: "9 PM",
    available: false,
    class: "cardio",
    userId: null,
    trainingName: "Michael Chen"
  },
  // HIIT

  {
    time: "6 AM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "7 AM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "8 AM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "9 AM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "10 AM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "11 AM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "12 PM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "1 PM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "2 PM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "3 PM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "4 PM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "5 PM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "6 PM",
    available: true,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "7 PM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "8 PM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },
  {
    time: "9 PM",
    available: false,
    class: "hiit",
    userId: null,
    trainingName:"Emily Rodriguez"
  },

  // Yoga

  {
    time: "6 AM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "7 AM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "8 AM",
    available: false,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "9 AM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "10 AM",
    available: false,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "11 AM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "12 PM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "1 PM",
    available: false,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "2 PM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "3 PM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "4 PM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "5 PM",
    available: false,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },

  {
    time: "6 PM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "7 PM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "8 PM",
    available: true,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },
  {
    time: "9 PM",
    available: false,
    class: "yoga",
    userId: null,
    trainingName:"Jessica White"
  },

// Functional Training
  {
    time: "6 AM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "7 AM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "8 AM",
    available: false,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "9 AM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "10 AM",
    available: false,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "11 AM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "12 PM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "1 PM",
    available: false,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "2 PM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "3 PM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "4 PM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "5 PM",
    available: false,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },

  {
    time: "6 PM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "7 PM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "8 PM",
    available: true,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },
  {
    time: "9 PM",
    available: false,
    class: "functional-training",
    userId: null,
    trainingName:"David Kim"
  },

// weight-management

  {
    time: "6 AM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "7 AM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "8 AM",
    available: false,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "9 AM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "10 AM",
    available: false,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "11 AM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "12 PM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "1 PM",
    available: false,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "2 PM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "3 PM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "4 PM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "5 PM",
    available: false,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "6 PM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "7 PM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "8 PM",
    available: true,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },
  {
    time: "9 PM",
    available: false,
    class: "weight-management",
    userId: null,
    trainingName:"Chris Evans"
  },

// post-natal-fitness
  
  {
    time: "6 AM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "7 AM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "8 AM",
    available: false,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "9 AM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "10 AM",
    available: false,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "11 AM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "12 PM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "1 PM",
    available: false,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "2 PM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "3 PM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "4 PM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "5 PM",
    available: false,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "6 PM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "7 PM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "8 PM",
    available: true,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },
  {
    time: "9 PM",
    available: false,
    class: "post-natal-fitness",
    userId: null,
    trainingName:"Olivia Grace"
  },

// sports-performance
  {
    time: "6 AM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "7 AM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "8 AM",
    available: false,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "9 AM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "10 AM",
    available: false,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "11 AM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "12 PM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "1 PM",
    available: false,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "2 PM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "3 PM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "4 PM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "5 PM",
    available: false,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "6 PM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "7 PM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "8 PM",
    available: true,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
  {
    time: "9 PM",
    available: false,
    class: "sports-performance",
    userId: null,
    trainingName:"Daniel Wong"
  },
]


export const seed = async (url) => {
  try {
    if (!url) return console.log("MongoDB URL missing")
    await mongoose.connect(url)


    await OurTrainingModel.deleteMany({})
    const insertedTraining = await OurTrainingModel.insertMany(ourTraining)
    console.log(`${insertedTraining.length} - Our Training inserted successfully`)

    // TrainerSchema
    await TrainerSchema.deleteMany({})
    const insertedtrainers = await TrainerSchema.insertMany(trainers)
    console.log(`${insertedtrainers.length} - Trainers inserted successfully`)

    // ScheduleItems
    // await ScheduleItems.deleteMany({})
    // const scheduleItems = await ScheduleItems.insertMany(schedule)
    // console.log(`${scheduleItems.length} - Schedule Items inserted successfully`)

    await ScheduleItems.deleteMany({});
    console.log("Old schedule cleared");
    // Insert new schedule
    const inserted = await ScheduleItems.insertMany(schedule);
    console.log(`${inserted.length} Schedule Items inserted successfully`);

    // membershipPlans
    await MembershipPlans.deleteMany({})
    const insertedMembershipPlans = await MembershipPlans.insertMany(membershipPlans)
    console.log(`${insertedMembershipPlans.length} - Membership Plans inserted successfully`)

    // testimonials
    await Testimonials.deleteMany({})
    const insertedTestimonials = await Testimonials.insertMany(testimonials)
    console.log(`${insertedTestimonials.length} - Testimonials inserted successfully`)

    // coachs

    await Coachs.deleteMany({})
    const insertedCoaches = await Coachs.insertMany(coachs)
    console.log(`${insertedCoaches.length} - Coaches inserted successfully`)

    // ClassSchedule
    await ClassSchedule.deleteMany({})
    const classSchedules = await ClassSchedule.insertMany(classSchedule)
    console.log(`${classSchedules.length} - Class Schedules inserted successfully`)



  }
  catch (error) {
    console.log(error)
  }
}


import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// FETCH DATA

//    TRAINERS

export const getTrainers = async () => {
    return API.get("/trainers");
};

//    SCHEDULE

export const getSchedule = async () => {
    return API.get("/schedule");
};

//    MEMBERSHIP PLANS

export const getMembershipPlans = async () => {
    return API.get("/membership-plans");
};

//    TESTIMONIALS / TRANSFORMATIONS

export const getTestimonials = async () => {
    return API.get("/transformations");
};


//   getCoachs

export const getCoachs = async () => {
    return API.get("/coachs");
}

export const getClassSchedule = async (classType) => {
    return API.get(`/class-schedule/${classType}`);
}

// PAYMENT API

export const paymentVerify = async (data) => {
    return API.post("/payment/verify-payment", data);
}


// GET IN TOACH 

export const getInTouch = async (data) => {
    return API.post("/getintouch", data);
}

// AUTHENTICATED USER

// LOGIN 

export const login = async (data) => {
    return API.post("/login", data);
}

export const sendverification = async (data) => {
    return API.post("/sendverification", data);
}

export const signup = async (data) => {
    return API.post("/signup", data);
}

// update profile

export const updateProfile = async (data) => {
    return API.put("/update-profile", data);
}

// Contact Mail

export const postContactMail = async (data) => {
    return API.post("/contact", data);
}


// POST Class Schedule DATA

export const postSelectClassSchedule = async (id) => {
    return API.post(`/class-schedule/${id}`);
}
// Mail send
export const mailSelectClassSchedule = async (scheduleTimeId) => {
    return API.post(`/sendclassschedule-mail/${scheduleTimeId}`);
}


// check Authenticated User
export const checkAuthenticatedUser = async () => {
    return API.get("/checktoken");
}

// USER

export const getAllUser = async () => {
    return API.get("/user")
}

export const getOneUser = async (id) => {
    return API.get(`/user/${id}`)
}

// profile get user class

export const getUserClassSchedule = async (id) => {
    return API.get(`/user-class-schedule`)
}

// logout

export const logoutUser = async (id) => {
    return API.post(`/logout`)
}


// check is admin

export const isAdmin = async () => {
    return API.get(`/checktoken`);
}


// admin API 

export const getAdminClassSchedule = async () => {
    return API.get(`/admin-class-schedule`);
}

// cancelledSelectClassSchedule
export const cancelledSelectClassSchedule = async (scheduleTimeId) => {
    return API.post(`/class-schedule/cancelled/${scheduleTimeId}`)
}
// Mail send //send-user-mail
export const cancelledMailSelectClassSchedule = async (userId, scheduleTimeId) => {
    return API.post(`/sendclassschedule/${userId}/${scheduleTimeId}`)
}

export const sendUserMail = async ({ email, name, message }) => {
    return API.post(`/send-user-mail`, { email, name, message })
}
export const sendAllUserMail = async (message) => {
    return API.post(`/send-all-user-mail`, { message })
}


// get-all-class-schedule

export const getAllClassSchedule = async () => {
    return API.get(`/get-all-class-schedule`)
} 

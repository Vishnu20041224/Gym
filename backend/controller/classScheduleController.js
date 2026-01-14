import ClassSchedule from "../model/classScheduleModel.js";
import { sendClassScheduleEmailInternal } from "./contactController.js";

export const getClassScheduleByType = async (req, res) => {
  try {
    const classType = req.params.type.toLowerCase(); // get type from route param
    console.log("classType", classType)
    const classSchedule = await ClassSchedule.find({ class: classType.toLowerCase() });

    res.status(200).json({
      success: true,
      data: classSchedule,
    });
    console.log(req.user)
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const postSelectClassSchedule = async (req, res) => {
  try {
    const { id } = req.params; // destructure params
    console.log("postSelectClassSchedule Start")

    // Find the class schedule by ID
    const classSchedule = await ClassSchedule.findById(id);

    if (!classSchedule) {
      return res.status(404).json({
        success: false,
        message: "Class schedule not found",
      });
    }

    // Mark as selected
    console.log("userId ", req.user._id)
    classSchedule.available = false;
    classSchedule.userId = req.user._id;
    await classSchedule.save(); // save the change

    // send Mail 
    await sendClassScheduleEmailInternal(req.user._id, id)

    res.status(200).json({
      success: true,
      data: classSchedule,
      message: "Class schedule selected successfully",
    });



  } catch (error) {
    console.error("Error selecting class schedule:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get user class 

export const getUserClassSchedule = async (req, res) => {
  try {
    console.log(req.user)
    const userClassSchedule = await ClassSchedule.find({ userId: req.user._id })

    res.status(200).json({
      success: true,
      data: userClassSchedule,
    });
    console.log(req.user)
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// admin

export const getBookingClassSchedule = async (req, res) => {
  try {
    const bookedClassSchedule = await ClassSchedule.find({ available: false });

    res.status(200).json({
      success: true,
      data: bookedClassSchedule,
    });
    console.log(req.user)
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const cancelledBookingClassSchedule = async (req, res) => {
  try {

    let { id } = req.params

    const bookedClassSchedule = await ClassSchedule.findByIdAndUpdate(
      id,
      { available: true, userId: null },
      { new: true } // return updated document
    );

    // 2️⃣ If schedule not found
    if (!bookedClassSchedule) {
      return res.status(404).json({
        success: false,
        message: "Class schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      data: bookedClassSchedule,
    });
    console.log(req.user)
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getAllClassSchedule = async (req, res) => {
  try {
    let allClassScheduls = await ClassSchedule.find({})
    return res.status(200).json({
      success: true,
      data: allClassScheduls
    })
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
}
import OurTrainingModel from "../model/ourTrainingModel.js";

export const getOurTraining  = async (req, res) => {
  try {
    const training = await OurTrainingModel.find({});
    res.status(200).json({
     success: true,
      data: training,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

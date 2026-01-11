import TrainingModel from "../model/trainersModel.js";

export const getTraining = async (req, res) => {
    try {
        const training = await TrainingModel.find({});
        res.status(200).json({
            success: true,
            data: training
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", success: false, error: error.message });
    }  
}

export const getOneTraining = async (req, res) => {
    try {
        const training = await TrainingModel.findById(req.params.id);
        res.status(200).json({
           success: true,
            data: training
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", success: false, error: error.message });
    }  
}
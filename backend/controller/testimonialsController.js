import Transformations from "../model/testimonialsModel.js";

export const getTransformations = async (req, res) => {
    try {
        const transformations = await Transformations.find({});
        res.status(200).json({
            success: true,
            data: transformations
        });
    } catch (error) {
        
        console.error("Error fetching transformations:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch transformations."
        });
    }
}
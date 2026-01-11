import Coachs from "../model/coachsModel.js";

export const getCoachs = async (req, res) => {
    try {
        const coachs = await Coachs.find({});
        res.status(200).json({
            success: true,
            data: coachs
        });
    } catch (error) {
        console.error("Error fetching coaches:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
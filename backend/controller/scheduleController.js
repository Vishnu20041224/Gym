import ScheduleItems from "../model/scheduleModel.js";

export const getSchedule = async (req, res) => {
    try {
        const scheduleItems = await ScheduleItems.find({});
        res.status(200).json({
            success: true,
            data: scheduleItems
        });
    }
    catch (error) {
        console.error("Error fetching schedule:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
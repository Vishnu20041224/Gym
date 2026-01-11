import MembershipPlans from "../model/membershipPlansModel.js";

export const getMembershipPlans = async (req, res) => {
    try {
        const membershipPlans = await MembershipPlans.find({});
        res.status(200).json({
            success: true,
            data: membershipPlans
        });
    } catch (error) {
        console.error("Error fetching membership plans:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch membership plans."
        });
    }
}
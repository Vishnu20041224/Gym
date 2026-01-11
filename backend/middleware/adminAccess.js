export const adminAccess = (req, res, next) => {
    try {
        if (!req.user || req.user.isAdmin !== true) {
            console.log("Admin access denied");
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        console.log("Admin access granted");
        next();
    } catch (error) {
        console.error("Admin access middleware error:", error);
        return res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
}
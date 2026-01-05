import Tesseract from "tesseract.js";

const YOUR_UPI_ID = "rhvishnushankar@oksbi";

export const verifyPaymentScreenshot = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }

        const imagePath = req.file.path;

        const result = await Tesseract.recognize(
            imagePath,
            "eng",
            { logger: m => console.log(m) }
        );

        const extractedText = result.data.text.toLowerCase();
        
        const upiMatched = extractedText.includes(
            YOUR_UPI_ID.toLowerCase()
        );

        if (!upiMatched) {
            return res.json({
                success: false,
                message: "UPI ID not found in screenshot",
            });
        }

        return res.json({
            success: true,
            message: "Payment detected. Verification pending.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Payment verification failed",
        });
    }
};

const reportService = require("../services/reportService"); // Ensure this service handles database operations

const addReport = async (req, res) => {
    try {

        const { report_appo_id, report_test_id } = req.body;

        const photo = req.files?.['report_photo']?.[0]?.path || null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        
        // Validate required fields
        if (!report_appo_id || !report_test_id ) {
            return res.status(400).json({
                status: false,
                message: "Appointment ID, Test ID, and User ID are required",
            });
        }

        await reportService.addReport(report_appo_id, report_test_id, extractedPhotoPath);

        res.status(201).json({ status: true, message: "Report added successfully" });
    } catch (error) {
        console.error("Error adding report:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

module.exports = { addReport };

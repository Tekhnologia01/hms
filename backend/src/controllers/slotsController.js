const slotsService = require("../services/slotsService");


//***************************GetReceptionist****************************//
const getDoctorsSlots = async (req, res) => {
    const {doctor_id, day_id} = req.query;
    try {
        const result = await slotsService.getDoctorDaySlots(doctor_id, day_id);
        
        res.status(200).json({
            status: true,
            data: result.length ? result[0] : [], // Return empty array if no data
            message: result.length ? "Slots retrieved successfully" : "No slots found",
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};



module.exports = { getDoctorsSlots };
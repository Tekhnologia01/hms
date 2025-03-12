const { query } = require("../utils/database");

const getDoctorDaySlots = async (doctor_id, day_id) => {
    try {
        const response = await query("CALL GetDoctorslot(?, ?)", [doctor_id, day_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

module.exports = { getDoctorDaySlots };
const { query } = require("../utils/database");

//***************************AddPatient****************************//

const addPrescription = async (
    appointment_id, medicine_name, quantity, common_note, dosage, duration, food_intake, created_by
) => {
    try {
        return await query("CALL AddPrescription(?,?,?,?,?,?,?,?)", [
            appointment_id,
            medicine_name,
            dosage,
            duration,
            food_intake,
            common_note,
            quantity,
            created_by
        ]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

module.exports = { addPrescription };

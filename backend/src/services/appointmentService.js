const { query } = require("../utils/database");

const addAppointment = async (
    patient_id,
    review,
    patient_source,
    visited_type,
    slot_no,
    date,
    doctor_id,
    appo_department_id,
    created_by,
    disease
) => {
    try {
        const result = await query(
            "CALL AddAppointment(?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
            [
                patient_id,
                review,
                patient_source,
                visited_type,
                slot_no,
                date,
                doctor_id,
                appo_department_id,
                created_by,
                disease
            ]
        );
        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

const getDoctorAppointment = async (doctor_id, appointment_date) => {
    try {
        const result = await query(
            "CALL GetAppointmentsDoctorwise(?, ?)",
            [
                doctor_id,
                appointment_date
            ]
        );

        return result[0];
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

const getAppointmentWiseDoctorpatientDetails = async (appo_id) => {
    try {
        const [result] = await query("CALL GetAppointmentsDetails(?)", [appo_id]);
        return result[0];
    } catch (error) {
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error fet appointment data.");
        }
    }
};

const GetPrescriptionTestAppointwise = async (appo_id) => {
    try {
        const result = await query("CALL GetPrescriptionTest(?)", [appo_id]);
        data = { prescription: result[0], Test: result[1] };
        return data;
    } catch (error) {
        console.error("Database error:", error);

        // Handling stored procedure exception
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting appointment data.");
        }
    }
};

module.exports = { addAppointment, getDoctorAppointment, getAppointmentWiseDoctorpatientDetails, GetPrescriptionTestAppointwise };

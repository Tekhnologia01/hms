const { query } = require("../utils/database");

//***************************AddPatient****************************//

const addPatient = async (patient_name, patient_phone_no, patient_age, patient_sex, patient_address, patient_id_proof, extractedPath,photoPath,userId,patient_city) => {
    try {
        return await query("CALL AddPatient(?,?,?,?,?,?,?,?,?,?)", [patient_name, patient_phone_no, patient_age, patient_sex, patient_address, patient_id_proof, extractedPath,photoPath, userId,patient_city]);
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetPatient****************************//

const getPatient = async (page,limit) => {
    try {
        const response = await query("CALL GetAllPatients(?,?)", [page, limit]);
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0]; 
        const paginationData = response[1][0]; 

        return {
            data: doctorData,  // Array of doctors
            pagination: paginationData || {
                TotalRecords: 0,
                TotalPages: 0,
                CurrentPage: page,
                LimitPerPage: limit
            }
        };

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************DeletePatient****************************//

const deletePatient = async (doctorId) => {
    try {
        const response = await query("UPDATE tbl_users SET user_status = ? WHERE user_id = ?",[0,doctorId]);
        return response;
        // console.log(response)
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetPatientDepartmentWise****************************//

const getPatientDepartmentwise = async (dep_id,page,limit) => {
    try {
        const response = await query("CALL GetPatientDepartmentwise(?,?,?)",[dep_id,page,limit]);
        return response;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


module.exports = {addPatient, getPatient ,deletePatient,getPatientDepartmentwise};


const { query } = require("../utils/database");
//***************************AddReceptionist****************************//

const addReceptionist = async (
    degree,
    medical_license_number,
    year_of_graduation,
    institute_name,
    language_known,
    computer_skills,
    specialization,
    name,
    phoneno,
    email_id,
    sex,
    age,
    address,
    city,
    id_proof,
    extractedIdProofImagePath,
    extractedPhotoPath,
    department_id,
    username,
    password,
    joining_date,
    shift_id,
    day_ids,
    created_by
) => {
    try {
        const result = await query("CALL AddReceptionist(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            name,
            email_id,
            extractedPhotoPath,
            password,
            department_id,
            username,
            created_by,
            degree,
            specialization,
            year_of_graduation,
            medical_license_number,
            institute_name,
            computer_skills,
            language_known,
            null,
            null,
            joining_date,
            phoneno,
            sex,
            age,
            address,
            city,
            id_proof,
            extractedIdProofImagePath,
            shift_id,
            day_ids,
        ]);

        return result;
    } catch (error) {
        console.error("Database error:", error);

        // Check if the error is from the stored procedure
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message); // Propagate the stored procedure's error message
        } else {
            throw new Error("Error inserting doctor data."); // Generic error for other database issues
        }
    }
};

//***************************GetReceptionist****************************//

const getReceptionist = async () => {
    try {
        const response = await query("SELECT * FROM tbl_users where role_id = 4 And user_status = 1");
        return response;
        // console.log(response)
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



//***************************DeleteReceptionist****************************//
const deleteRecetionist = async (doctorId) => {
    try {
        const response = await query("UPDATE tbl_users SET user_status = ? WHERE user_id = ?", [0, doctorId]);
        return response;
        // console.log(response)
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

//***************************GetReceptionistDepartmentwise****************************//

const getReceptionistsDepartmentwise = async (dep_id, page, limit) => {
    try {
        const response = await query("CALL GetReceptionistDepartmentwise(?,?,?)", [dep_id, page, limit]);

        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }
        const receptionistData = response[0];
        const paginationData = response[1][0];
        console.log("paginationData:", response);

        return {
            data: receptionistData,
            pagination: paginationData || {
                TotalRecords: 0,
                TotalPages: 0,
                CurrentPage: page,
                LimitPerPage: limit
            }
        };

        // return response;
        // console.log(response)
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



module.exports = { addReceptionist, getReceptionist, deleteRecetionist, getReceptionistsDepartmentwise };


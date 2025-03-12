const { query } = require("../utils/database");
const { getEpochTime } = require("../utils/epochTime");

// const addLabAssistant = async (
//     name,
//     phoneno,
//     email_id,
//     sex,
//     age,
//     department_id,
//     address,
//     city,
//     id_proof,
//     degree,
//     specialization,
//     year_of_graduation,
//     issue_body,
//     license_expiry_date,
//     day_ids,
//     joining_date,
//     username,
//     password,
//     extractedIdProofImagePath,
//     extractedPhotoPath,
//     medical_license_number,
//     institute_name,
//     shift_id,
//     created_by
// ) => {


//     console.log("shift id ", getEpochTime(joining_date))




//     try {
//         // Call the AddDoctor stored procedure
//         const result = await query("CALL AddLabAssistant1(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
//             name,
//             email_id,
//             extractedPhotoPath,
//             password,
//             department_id,
//             username,
//             created_by,
//             degree,
//             specialization,
//             year_of_graduation,
//             medical_license_number,
//             issue_body,
//             institute_name,
//             license_expiry_date,
//             getEpochTime(joining_date),
//             phoneno,
//             sex,
//             age,
//             address,
//             city,
//             id_proof,
//             extractedIdProofImagePath,
//             shift_id,
//             day_ids,
//         ]);

//         return result;
//     } catch (error) {
//         console.error("Database error:", error);

//         // Check if the error is from the stored procedure
//         if (error.code === 'ER_SIGNAL_EXCEPTION') {
//             throw new Error(error.message); // Propagate the stored procedure's error message
//         } else {
//             throw new Error("Error inserting lab assistance data."); // Generic error for other database issues
//         }
//     }
// };

//***************************GetLabepartmentwise****************************//

// const getLabassistantsDepartmentwise = async (dep_id, page, limit) => {
//     try {
//         const response = await query("CALL GetLabAssistantDepartmentwise(?,?,?)", [dep_id, page, limit]);
//         return response;
//         // console.log(response)
//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };


const addLabAssistant = async (
    name,
    phoneno,
    email_id,
    sex,
    age,
    department_id,
    address,
    city,
    id_proof,
    degree,
    specialization,
    year_of_graduation,
    issue_body,
    license_expiry_date,
    day_ids,
    joining_date,
    username,
    password,
    extractedIdProofImagePath,
    extractedPhotoPath,
    medical_license_number,
    institute_name,
    shift_id,
    created_by
) => {
    console.log("Input Data:", {
        name,
        phoneno,
        email_id,
        sex,
        age,
        department_id,
        address,
        city,
        id_proof,
        degree,
        specialization,
        year_of_graduation,
        issue_body,
        license_expiry_date,
        day_ids,
        joining_date,
        username,
        password,
        extractedIdProofImagePath,
        extractedPhotoPath,
        medical_license_number,
        institute_name,
        shift_id,
        created_by
    });

    console.log("Epoch Time for Joining Date:", getEpochTime(joining_date));

    try {
        const result = await query("CALL AddLabAssistant1(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
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
            issue_body,
            institute_name,
            joining_date,
            getEpochTime(joining_date),
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

        console.log("Stored Procedure Result:", result);

        return result;
    } catch (error) {
        console.error("Database error:", error);

        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting lab assistant data.");
        }
    }
};


const getLabassistantsDepartmentwise = async (dep_id, page, limit) => {
    try {
        const response = await query("CALL GetLabAssistantDepartmentwise(?,?,?)", [dep_id, page, limit]);

        // MySQL stored procedures return multiple result sets
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0]; // First result set: Doctors List
        const paginationData = response[1][0]; // Second result set: Pagination Info (First object)

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


const AddTest = async (testName, testDescription, extractedPhotoPath, testFees, created_by) => {
    try {
        const response = await query("CALL AddTest(?,?,?,?,?)", [testName, testDescription, extractedPhotoPath, testFees, created_by]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const GetTest = async () => {
    try {
        const response = await query("select * from tbl_test");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const DeleteTest = async (id) => {
    try {
        const response = await query("UPDATE tbl_test SET test_status = ? WHERE test_id = ?", [0, id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



const AddLabTests = async (labAppoiId, labTestIds, recommendationDate, testReason, testStatus) => {
    try {
        if (!Array.isArray(labTestIds) || labTestIds.length === 0) {
            throw new Error("labTestIds must be a non-empty array");
        }

        const results = [];

        for (const labTestId of labTestIds) {
            const result = await query(
                "CALL AddLabTest(?, ?, ?, ?, ?)",
                [labAppoiId, labTestId, recommendationDate, testReason, testStatus]
            );
            results.push(result);
        }

        return results;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};




const UpdateLabTest = async (labAppoiId, labTestId, testStatus) => {
    try {
        const result = await query(
            "CALL UpdateLabTestStatus(?, ?, ?)",
            [labAppoiId, labTestId, testStatus]
        );
        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};




const GetLabTests = async (test_id) => {
    try {
console.log(test_id)
        const response = await query("CALL GetTodayLabAppointment(?)", [test_id]);
             const data = {
                data: response[0],
                test:response[1]
             }
        return data;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};



module.exports = { addLabAssistant, getLabassistantsDepartmentwise, AddTest, GetTest, DeleteTest,AddLabTests,UpdateLabTest,GetLabTests };
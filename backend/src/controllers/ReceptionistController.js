const receptionistService = require("../services/receptionistService");
const { getEpochTime } = require("../utils/epochTime");
//***************************AddReceptionist****************************//

const convertToArrayString = (str) => {
    return JSON.stringify(str.split(',').map(Number));
}

const addReceptionist = async (req, res) => {
    try {
        const photo = req.files && req.files['user_photo'] ? req.files['user_photo'][0].path : null;
        const idProofImage = req.files && req.files['id_proof_image'] ? req.files['id_proof_image'][0].path : null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        const extractedIdProofImagePath = idProofImage ? idProofImage.split("\\").slice(-2).join("\\") : null;

        const {
            degree,
            medical_license_number,
            year_of_graduation,
            institute_name,
            issue_body,
            license_expiry_date,
            specialization,
            name,
            phoneno,
            email_id,
            sex,
            age,
            address,
            city,
            id_proof,
            department_id,
            username,
            joining_date,
            shift_id,
            day_ids,
            password,
            computer_skills,
            language_known,
            created_by
        } = req.body;

        // Validate required fields
        // if (
        //     !highest_qualification || !licene_number || !year_of_graduation || !institute_name || 
        //     !language_known || !computer_skills || !field_of_study || !working_day || 
        //     !start_time || !end_time || !name || !phoneno || !email_id || !sex || 
        //     !age || !address || !city || !id_proof || !department_id || !role_id || 
        //     !username || !password
        // ) {
        //     return res.status(400).json({ status: false, message: "All required fields must be provided" });
        // }


        await receptionistService.addReceptionist(
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
            getEpochTime(joining_date),
            shift_id,
            convertToArrayString(day_ids),
            created_by
        );

        res.status(201).json({ message: "Receptionist added successfully" });
    } catch (error) {
        console.error("Error adding receptionist:", error);
        res.status(500).json({ error: error.message });
    }
};

//***************************GetReceptionist****************************//
const getReceptionist = async (req, res) => {
    try {
        const result = await receptionistService.getReceptionist();
        
        res.status(200).json({
            status: true,
            data: result.length ? result : [], // Return empty array if no data
            message: result.length ? "Receptionist retrieved successfully" : "No receptionists found",
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

//***************************DeleteReceptionist****************************//

const DeleteReceptionist = async (req, res) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId || isNaN(doctorId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing doctorId" });
        }
        // Attemp
        const result = await receptionistService.deleteDoctor(doctorId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Doctor Id not found or already deleted" });
        }
        res.status(200).json({ status: true, message: "Doctor deleted successfully" });
   
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************GetReceptionistDepartmentwise****************************//

const getReceptionistsDepartmentwise = async (req, res) => {
    try {
        const {dep_id,page,limit} = req.query;
        const result = await receptionistService.getReceptionistsDepartmentwise(dep_id,page,limit);
        res.status(200).json({status:true, data:result,message:"Receptionist departmentwise retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};



module.exports = { addReceptionist, getReceptionist, DeleteReceptionist,getReceptionistsDepartmentwise };
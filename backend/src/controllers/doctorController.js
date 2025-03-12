const doctorService = require("../services/doctorService");
const { convertEpochToDate, getEpochTime } = require("../utils/epochTime");
//***************************AddDoctor****************************//

const addDoctor = async (req, res) => {
    try {
        // Extract file paths
        const photo = req.files?.['user_photo']?.[0]?.path || null;
        const idProofImage = req.files?.['id_proof_image']?.[0]?.path || null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;
        const extractedIdProofImagePath = idProofImage ? idProofImage.split("\\").slice(-2).join("\\") : null;

        // Extract fields from request body
        const {
            degree,
            specialization,
            year_of_graduation,
            additional_certificate,
            board_certificate,
            issue_body,
            medical_license_number,
            license_expiry_date,
            post_degree,
            post_specialization,
            post_year_of_graduation,
            name,
            phoneno,
            email_id,
            sex,
            age,
            address,
            city,
            id_proof,
            department_id,
            role_id,
            username,
            password,
            joining_date,
            created_by,
            consultancy_fee,
            shift_id,
            day_ids
        } = req.body;

        // Validate required fields
        if (
            !username || !password || !phoneno || !email_id || !city || !id_proof ||
            !department_id || !age || !sex || !degree || !specialization ||
            !year_of_graduation || !shift_id || !day_ids
        ) {
            return res.status(400).json({ status: false, message: "Required fields are missing" });
        }

        // Call the service to add the doctor
        await doctorService.addDoctor(
            degree,
            specialization,
            year_of_graduation,
            additional_certificate,
            board_certificate,
            issue_body,
            medical_license_number,
            getEpochTime(license_expiry_date),
            post_degree,
            post_specialization,
            post_year_of_graduation,
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
            2,
            username,
            password,
            getEpochTime(joining_date),
            created_by,
            consultancy_fee,
            shift_id,
            day_ids,
        );

        res.status(201).json({ message: "Doctor added successfully" });
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: error.message });
    }
};

//***************************GetDoctor****************************//

const getDoctors = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const doctors = await doctorService.getDoctors(page || 1, limit || 10);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//***************************DeleteDoctor****************************//

const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId || isNaN(doctorId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing doctorId" });
        }
        // Attemp
        const result = await doctorService.deleteDoctor(doctorId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Doctor Id not found or already deleted" });
        }
        res.status(200).json({ status: true, message: "Doctor deleted successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//***************************GetDoctorDepartmentwise****************************//

const getDoctorsDepartmentwise = async (req, res) => {
    try {
        const { dep_id, page, limit } = req.query;

        // Ensure numeric values are converted properly
        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;

        console.log("Page:", pageNumber, "Limit:", limitNumber);

        // Call the service function with explicit NULL if values are missing
        const result = await doctorService.getDoctorsDepartmentwise(dep_id, pageNumber, limitNumber);

        res.status(200).json({
            status: true,
            data: result,
            message: "Doctors retrieved department-wise successfully",
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};




const getAllDoctorsIdwise = async (req, res) => {
    try {
        const {doctor_id,page,limit} = req.query;
        const result = await doctorService.getAllDoctorsIdwise(doctor_id,page||1,limit||10);
        res.status(200).json({status:true, data:result,message:"doctor departmentwise retrieved successfully"});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



const getParticularDoctor = async (req, res) => {
    try {
        const {doctor_id} = req.query;
        const result = await doctorService.getParticularDoctor(doctor_id);
        res.status(200).json({status:true, data:result,message:"doctor retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};

const getTodayAppointmentDoctors = async (req, res) => {
    try {
        const {appo_date}=req.query;
        if (!appo_date) {
            return res.status(400).json({ status: false, message: "Invalid or missing appointment date" });
        }

        const result = await doctorService.getTodaysDoctors(getEpochTime(appo_date));
        if (result.length !== 0) {
            result.forEach(doctor => {
                doctor.joiningDate = convertEpochToDate(doctor.joiningDate).split(',')[0];
            });
        }
        res.status(200).json({ status: true, data: result, message: "doctor retrieved successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

//***************************Get Todays Appointment Doctors****************************//

const getDoctorAppointmentByDate = async (req, res) => {
    const { doctor_id, appointment_date, page, page_size } = req.query;

   const data= getEpochTime(appointment_date)
   console.log("data",data)

    if (!doctor_id || !appointment_date) {
        return res.status(400).json({ status: false, message: "Invalid or missing doctorId or appointment date" });
    }
    try {
        const result = await doctorService.getDoctorsAppointmentDate(doctor_id,getEpochTime(appointment_date), page, page_size);
        res.status(200).json({ status: true, data: result, message: "doctor appointments retrieved successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { addDoctor, getDoctors,deleteDoctor,getDoctorsDepartmentwise,getAllDoctorsIdwise,getParticularDoctor, getTodayAppointmentDoctors,getDoctorAppointmentByDate};

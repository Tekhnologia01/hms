const patientService = require("../services/patientService");

//***************************AddPatient****************************//

// const addPatient = async (req, res) => {
//     try {
//         const { patient_name, patient_phone_no, patient_age, patient_sex, patient_address, patient_id_proof } = req.body;
//         const photo = req.files['patient_proof_image'] ? req.files['patient_proof_image'][0].path : null;
//         const extractedPath = photo.split("\\").slice(-2).join("\\");
//         await patientService.addPatient(patient_name, patient_phone_no, patient_age, patient_sex || null, patient_address, patient_id_proof, extractedPath);
//         res.status(201).json({ message: "Doctor added successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



const addPatient = async (req, res) => {
    try {
        const {userId}=req.params
        const { patient_name, patient_phone_no, patient_age, patient_sex, patient_address, patient_id_proof,patient_city } = req.body;

        const proofImage = req.files['patient_proof_image'] ? req.files['patient_proof_image'][0].path : null;
        const patientPhoto = req.files['patient_photo'] ? req.files['patient_photo'][0].path : null;

        const proofImagePath = proofImage ? proofImage.split("\\").slice(-2).join("\\") : null;
        const patientPhotoPath = patientPhoto ? patientPhoto.split("\\").slice(-2).join("\\") : null;

        await patientService.addPatient(
            patient_name,
            patient_phone_no,
            patient_age,
            patient_sex ,
            patient_address,
            patient_id_proof,
            proofImagePath,
            patientPhotoPath,
            userId,
            patient_city
           
        );

        res.status(201).json({ message: "Patient added successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//***************************GetPatient****************************//

const getPatient = async (req, res) => {
    try {

        const {page,limit} = req.query;

        const pageNumber = page ? parseInt(page, 10) : null;
        const limitNumber = limit ? parseInt(limit, 10) : null;
        const doctors = await patientService.getPatient(pageNumber ,limitNumber );
        res.status(200).json({status:true,data:doctors,message:"Patient added successfully"});
    } catch (error) {
        res.status(500).json({ status:false,error: error.message });
    }
};

//***************************DeletePatient****************************//  
const deletePatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        if (!patientId || isNaN(patientId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing patientId" });
        }
        const result = await patientService.deletePatient();
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Patient Id not found or already deleted" });
        }
        res.status(200).json({ status: true, message: "Patient deleted successfully" }); 
       } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};



const getDepartmentwise = async (req, res) => {
    try {

        const {dep_id,page,limit} = req.query;

        const result = await patientService.getPatientDepartmentwise(dep_id,page,limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addPatient,getPatient,deletePatient ,getDepartmentwise};

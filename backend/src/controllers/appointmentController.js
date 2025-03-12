const appointmentService = require("../services/appointmentService");
const { getEpochTime } = require("../utils/epochTime");

//***************************AddAppointment****************************//

const addAppointment = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { 
            patient_id, 
            review, 
            patient_source, 
            visited_type, 
            slot_no, 
            date, 
            doctor_id, 
            appo_department_id ,
            disease
        } = req.body; 

        // Validate required fields
        if (!patient_id || !review || !patient_source || !visited_type || !slot_no || !date || !doctor_id || !userId || !appo_department_id) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        // Call the service function to add an appointment
        await appointmentService.addAppointment(
            patient_id,
            review,
            patient_source,
            visited_type,
            slot_no,
            getEpochTime(date),
            doctor_id,
            appo_department_id,
            userId ,
            disease
        );

        res.status(201).json({ status: true, message: "Doctor appointment added successfully" });
    } catch (error) {
        console.error("Error adding appointment:", error);
        res.status(500).json({ status: false, error: "Internal Server Error" });
    }
};

//***************************GetDoctorAndDayAppointment****************************//

const getDoctorAppointment = async (req, res) => {
    try {
        const {doctor_id, appointment_date} = req.query;
      const result = await appointmentService.getDoctorAppointment(doctor_id, getEpochTime(appointment_date));
      if (!result || (Array.isArray(result) && result.length === 0)) {
        return res.status(200).json({
          status: true,
          data: []  
        });
      }
      res.status(200).json({status: true, data:result});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getAppointmentWiseDoctorpatientDetails = async (req, res) => {
    try {
        const {appo_id} = req.query;
      const result = await appointmentService.getAppointmentWiseDoctorpatientDetails(appo_id);
      if (!result || (Array.isArray(result) && result.length === 0)) {
        return res.status(200).json({
          status: true,
          data: []  
        });
      }
      res.status(200).json({status: true, data:result});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const  GetPrescriptionTestAppointwise= async (req, res) => {
    try {
      const {appo_id} = req.query;
      const result = await appointmentService.GetPrescriptionTestAppointwise(appo_id);
      if (!result || (Array.isArray(result) && result.length === 0)) {
        return res.status(200).json({
          status: true,
          data: []  
        });
      }
      res.status(200).json({status: true, data:result});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { addAppointment,getDoctorAppointment,getAppointmentWiseDoctorpatientDetails,GetPrescriptionTestAppointwise};

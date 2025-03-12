const express = require("express");
const { addAppointment,getDoctorAppointment,getAppointmentWiseDoctorpatientDetails,GetPrescriptionTestAppointwise} = require("../controllers/appointmentController");
const router = express.Router();

router.get("/doctordaywise", getDoctorAppointment);

router.get("/getAppointmentWiseDoctorpatientDetails", getAppointmentWiseDoctorpatientDetails);

router.post("/add/:userId", addAppointment);

router.get("/getprescriptiontest", GetPrescriptionTestAppointwise
);

module.exports = router;

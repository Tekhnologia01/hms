const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { getDoctors ,addDoctor,deleteDoctor,getDoctorsDepartmentwise,getAllDoctorsIdwise,getTodayAppointmentDoctors,getDoctorAppointmentByDate} = require("../controllers/doctorController");
const router = express.Router();
router.get("/get", getDoctors);
router.get("/getDoctorsDepartmentwise", getDoctorsDepartmentwise);
router.get("/getAllApointmentDoctorswise", getAllDoctorsIdwise);
router.get("/getDoctorsWithTodayAppointment", getTodayAppointmentDoctors);
router.get("/getDoctorsAppointmentByDate", getDoctorAppointmentByDate);

router.post(
  "/add",
  upload.fields([
    { name: "id_proof_image", maxCount: 1 },
    { name: "user_photo", maxCount: 1 }
  ]),
  addDoctor
);

router.delete("/delete/:doctorId",deleteDoctor);
module.exports = router;

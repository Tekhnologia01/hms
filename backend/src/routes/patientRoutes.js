const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { getPatient ,addPatient,getDepartmentwise} = require("../controllers/patientController");
const router = express.Router();
router.get("/getAll", getPatient);
router.get("/getDepartmentwise", getDepartmentwise);

// router.post("/addpatient",upload.fields([
//     { name: "patient_proof_image", maxCount: 1 }
//   ]), addPatient);

router.post(
  "/addpatient/:userId",
  upload.fields([
    { name: "patient_proof_image", maxCount: 1 },
    { name: "patient_photo", maxCount: 1 }
  ]),
  addPatient
);
module.exports = router;

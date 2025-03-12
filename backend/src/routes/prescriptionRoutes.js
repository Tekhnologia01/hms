const express = require("express");
const { addPrescription } = require("../controllers/prescriptionController");
const router = express.Router();
router.post("/add", addPrescription);

module.exports = router;

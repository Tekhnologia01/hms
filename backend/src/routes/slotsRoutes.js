const express = require("express");
const { getDoctorsSlots } = require("../controllers/slotsController");
const router = express.Router();
router.get("/getDoctorSlots", getDoctorsSlots);

module.exports = router;

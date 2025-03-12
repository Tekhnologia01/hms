const express = require("express");
const router = express.Router();
const { billingAndCharges, GetAllBillingAndCharges, UpdateBillingAndCharges,addDoctorBill} = require("../controllers/billingAndChargesController");
router.post("/BillingAndCharges", billingAndCharges);
router.get('/GetAllBillingAndCharges', GetAllBillingAndCharges);
router.put('/UpdateBillingAndCharges/:id', UpdateBillingAndCharges);
router.post('/createbill', addDoctorBill);
module.exports = router;    
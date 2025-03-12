const express = require("express");
const { getMasterDataOfFees} = require("../controllers/feesController");
const router = express.Router();
router.get("/masterdata", getMasterDataOfFees);

module.exports = router;

const express = require("express");
const { loginUser, getUserCount, getUserCountByDepartment, getUserDetails } = require("../controllers/authConttroller");
const router = express.Router();
router.post("/login", loginUser);
router.get("/count", getUserCount);
router.get("/DepartmentWiseCount", getUserCountByDepartment);
router.get("/details", getUserDetails);
module.exports = router;

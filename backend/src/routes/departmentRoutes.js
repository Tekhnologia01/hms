const express = require("express");
const { getDepartments,addDepartment,deleteDepartment,updateDepartment,getStaffDepartmentwise,getShift,getDay} = require("../controllers/departmentController");
const router = express.Router();

router.get("/get", getDepartments);

router.post("/add/:userId", addDepartment);

router.delete("/delete/:departmentId", deleteDepartment);

router.put("/update/:departmentId", updateDepartment);

router.get("/getstaff", getStaffDepartmentwise);

router.get("/getshift", getShift);

router.get("/getday", getDay);


module.exports = router;

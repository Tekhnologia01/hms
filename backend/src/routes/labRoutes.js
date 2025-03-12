const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { addLabAssistant,getLabassistantsDepartmentwise ,AddTest,GetTest,DeleteTest,AddLabTests,UpdateLabTest,GetLabTests} = require("../controllers/labController");

const router = express.Router();

router.get("/getLabassistantDepartmentwise", getLabassistantsDepartmentwise);

router.post(
  "/add",
  upload.fields([
    { name: "id_proof_image", maxCount: 1 },
    { name: "user_photo", maxCount: 1 }
  ]),
  addLabAssistant
);

router.post(
  "/addtest/:userId",
  upload.fields([
    { name: "testPhoto", maxCount: 1 }]),
    AddTest
);

router.delete("/deletetest/:testId",DeleteTest);

router.get("/gettest", GetTest);

router.post("/addlabtest", AddLabTests);

router.post("/updatelabtest", UpdateLabTest);

router.get("/getlabtest",GetLabTests );




module.exports = router;

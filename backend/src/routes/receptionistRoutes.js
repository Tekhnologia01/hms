const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const { getReceptionist,addReceptionist,getReceptionistsDepartmentwise } = require("../controllers/ReceptionistController");
const router = express.Router();
router.get("/get", getReceptionist);
router.get("/getReceptionitsDepartmentwise", getReceptionistsDepartmentwise);


router.post(
  "/add",
  upload.fields([
    { name: "id_proof_image", maxCount: 1 },
    { name: "user_photo", maxCount: 1 }
  ]),
  addReceptionist
);


module.exports = router;

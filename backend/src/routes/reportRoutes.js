const express = require("express");
const {upload} = require("../middleware/multerMiddleware");
const {addReport } = require("../controllers/reportController");
const router = express.Router();
router.post(
    "/add",
    upload.fields([
      { name: "report_photo", maxCount: 1 },
    ]),
    addReport
  );
  


module.exports = router;

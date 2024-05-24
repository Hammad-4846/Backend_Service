const router = require("express").Router();

//controllers
const {
  getDataController,
  getNetBalanceController,
} = require("../controllers/transectionController");

//To Handle Multi-part Data
const multer = require("multer");
const upload = multer({ dest: "tmp/" });

//Please always set key as file in the Form
router.route("/transection").post(upload.single("file"), getDataController);
router.route("/balance").post(getNetBalanceController);

module.exports = router;

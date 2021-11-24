const express = require("express");
const router = express.Router();
const passport = require("passport");

const  { uploadToS3Bucket } = require("../controllers/uploadImageS3")

router.route("/").get( uploadToS3Bucket);

module.exports = router;
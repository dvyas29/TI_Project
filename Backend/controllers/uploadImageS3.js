
const R =require("../utils/s3Bucket")

exports.uploadToS3Bucket = async (req, res) => {
  try {
    const uploadUrl = await R.generateUploadURL();
    console.log(uploadUrl);
    res.status(200).json(uploadUrl);
  } catch (error) {
    res.status(400).json(error);
  }
};
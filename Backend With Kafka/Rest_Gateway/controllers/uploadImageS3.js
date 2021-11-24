
const R =require("../utils/s3Bucket")
var kafka = require('../kafka/client');
exports.uploadToS3Bucket = async (req, res) => {
  const msg = {}
  kafka.make_request("get_uploadImageS3", msg, function (error, uploadUrl) {
    //const uploadUrl = await R.generateUploadURL();
    //console.log(uploadUrl);
    if(error){
      res.status(500).json({
          success: false,
          msg: "Internal server error"
      });
      
          }else if(uploadUrl){
            res.status(200).json(uploadUrl);
          }
  
});
};
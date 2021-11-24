
const R =require("../utils/s3Bucket")

async function handle_request(msg, callback) {
    
    try {
    
        const uploadUrl = await R.generateUploadURL();
      callback(null, uploadUrl);
      console.log("after callback");
    } catch (err) {
         console.log("in service err")
         console.log("+++++++error in servic catch++++++++", err)
      callback(err.name, null);
    }
  }
  
  exports.handle_request = handle_request;
  
  
  
  
  
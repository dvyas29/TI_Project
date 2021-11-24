const User = require("../models/User")
async function handle_request(msg, callback) {
  console.log("Inside get all rests backend");
  
  try {
    const user = await User.findById(msg);

    //check if user exists
       if(!user){
        const err={}
        err.msg="No profile found";
        err.statusCode=400;

        callback(err, null);
       return ;
       }
    
   
    callback(null, user);
    console.log("after callback");
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;





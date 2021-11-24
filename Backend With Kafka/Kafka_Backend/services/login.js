const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
async function handle_request(msg, callback){
     console.log("Inside login service");
    //console.log(msg);
    try {
       //extract all the things that u want to work with using destructure
       const { email, password } = msg;

        //find the user first
    const user = await User.findOne({email}).select('+password');

    if(!user){
        const err={}
        err.msg="User not found";
        err.statusCode=404

        callback(err, null);
       return ;
   }
   callback(null, user);
   console.log("after callback");
 } catch (err) {
      console.log("in service err")
      console.log("+++++++error in servic catch++++++++", err)
   callback(err, null);
 }

};

exports.handle_request = handle_request;



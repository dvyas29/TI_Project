const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
async function handle_request( msg, callback){
     console.log("Inside register service");
   // console.log(msg);
    try {
       //extract all the things that u want to work with using destructure
       const { name, email, password, role, location } = msg;

       //Create user
       const user = await User.create({
           name,
           email,
           password,
           role,
           location
       });
   callback(null, user);
   console.log("after callback");
 } catch (err) {
      console.log("in service err")
      console.log("+++++++error in servic catch++++++++", err)
   callback(err, null);
 }

};

exports.handle_request = handle_request;



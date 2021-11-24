const User = require("../models/User")
async function handle_request(msg, callback) {
  console.log("Inside get all rests backend");
  
  try {
      let user;
      console.log("USER image add msg", msg)
     user = await User.findById(msg.body.id);

    //check if user exists
       if(!user){
        const err={}
        err.msg="No user found";
        err.statusCode=400;

        callback(err, null);
       return ;
       }
       user = await User.findByIdAndUpdate(msg.body.id, {profileUrl:msg.body.url}, {
        new: true,
        runValidators: true
    });
    
   
    callback(null, user);
    console.log("after callback");
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;





const User = require("../models/User")
async function handle_request(msg, callback) {
  console.log("Inside get all rests backend");
  
  try {
       console.log("in service try")
       const withLocation = await User.find({role:"restaurant", location:msg.location});
       const withoutLocation = await User.find({role:"restaurant", location:!msg.location});
   
       const restList = [...withLocation, ...withoutLocation];
   
   
       if(!restList){
        const err={}
        err.msg="No restaurant found";
        err.statusCode=400;

        callback(err, null);
       return ;
       }
    
   
    callback(null, restList);
    console.log("after callback");
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

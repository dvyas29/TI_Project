const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  console.log("Inside get single Dish backend");
  console.log(msg);

  try {
    //get dishes for a restaurant
    const dish = await Dish.find({_id: msg.id})
   
    //check if there are any dishes
    if(!dish){
        const err={}
        err.msg="No dish found";
        err.statusCode=400;

        callback(err, null);
       return ;
    }
    
   
    callback(null, dish);
    console.log("after callback");
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  console.log("Inside get delivery addresses backend");
  console.log(msg);

  //check if user is customer
//   if(req.user.role!== 'customer'){
//       return next(new ErrorResponse(`Only customers can add new address!`));
//   }
  try {
      //console.log("msg4444444444444444444444444", msg)
       //get dishes for a restaurant
    const dishes = await Dish.find({restid: msg.id})
   
    //check if there are any dishes
    if(!dishes){
        const err={}
        err.msg="No dish found with this name";
        err.statusCode=400;

        callback(err, null);
       return ;
    }
    
   
    callback(null, dishes);
    console.log("after callback");
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

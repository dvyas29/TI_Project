const DeliveryAddress = require("../models/DeliveryAddress");
async function handle_request(msg, callback) {
  console.log("Inside get delivery addresses backend");
  //console.log(msg);

  //check if user is customer
//   if(req.user.role!== 'customer'){
//       return next(new ErrorResponse(`Only customers can add new address!`));
//   }
  try {
       console.log("in service try")
       const addresses = await DeliveryAddress.find({custid: msg})
    
   
    callback(null, addresses);
    console.log("after callback");
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

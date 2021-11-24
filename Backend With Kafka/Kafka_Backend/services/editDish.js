const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  console.log("Inside post add dish backend");
  //console.log(msg);

  //check if user is customer
//   if(req.user.role!== 'customer'){
//       return next(new ErrorResponse(`Only customers can add new address!`));
//   }
  try {
    let dish = await Dish.findById(msg.dishid);
   if(!dish){
    console.log(" addDish in dish length> 0")
    const err={}
        err.msg="No dish found";
        err.statusCode=400;

        callback(err, null);
       return ;
   }

     if(dish.restid.toString() !== msg.id || msg.role !== 'restaurant'){
        const err={}
        err.msg="Not owner";
        err.statusCode=401;

        callback(err, null);
       return ;
    }
    
    dish = await Dish.findByIdAndUpdate(msg.dishid, msg.body, {
        new:true,
        runValidators: true
    });
  callback(null, dish);

  } catch (err) {
   // console.log(" addDish in catch error ala")
    callback("An error occurred please try again!", null);
  }
}

exports.handle_request = handle_request;

const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  console.log("Inside post add dish backend");
  //console.log(msg);

  //check if user is customer
//   if(req.user.role!== 'customer'){
//       return next(new ErrorResponse(`Only customers can add new address!`));
//   }
  try {
    console.log(" addDish in try")
      let dish;
   //check if dish with same name already exists
   dish = await Dish.find({name:msg.name, restid: msg.restid});
   console.log(" addDish after find dish")
   //dont allow if dish exists
   if(dish.length>0){
    console.log(" addDish in dish length> 0")
    const err={}
        err.msg="Dish with same name already exists";
        err.statusCode=400;

        callback(err, null);
       return ;
   }
    
  dish = await Dish.create(msg);
  console.log(" addDish after creating")
  callback(null, dish);

  } catch (err) {
    //console.log(" addDish in catch error ala")
    callback("An error occurred please try again!", null);
  }
}

exports.handle_request = handle_request;

const OrderSummary = require("../models/OrderSummary");
async function handle_request(msg, callback) {
  console.log("Inside post add order details backend");

  try {
    const orderData = await OrderSummary.findById(msg.id);
    if (!orderData) {
        console.log(" addDish in dish length> 0")
        const err={}
            err.msg="No order found";
            err.statusCode=400;
    
            callback(err, null);
           return ;
       }
    callback(null, orderData);
  } catch (err) {
    console.log(" getOrderDetails in catch error ala");
    callback("An error occurred please try again!", null);
  }
}

exports.handle_request = handle_request;

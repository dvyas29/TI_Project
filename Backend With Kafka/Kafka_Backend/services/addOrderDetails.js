const OrderSummary = require("../models/OrderSummary");
async function handle_request(msg, callback) {
  console.log("Inside post add order details backend");

  try {
    const orderData = await OrderSummary.create(msg.orderSummaryPayload);
  
    console.log(" addDish after creating");
    callback(null, orderData);
  } catch (err) {
    
    
    console.log(" addOrderDEtails in catch error ala");
    callback("An error occurred please try again!", null);
  }
}

exports.handle_request = handle_request;

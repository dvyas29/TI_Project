const OrderSummary = require("../models/OrderSummary");
async function handle_request(msg, callback) {
  console.log("Inside post add order details backend");

  try {
    let order = await OrderSummary.findById(msg.orderId);
    if(!order){
        
        const err={}
            err.msg="No order found";
            err.statusCode=400;
    
            callback(err, null);
           return ;
       }

        //update order status according to delivery type
  let orderData;
  const orderid = msg.orderId;
  const orderStatus = msg.orderStatus;
  if (
    orderStatus === "Order Received" ||
    orderStatus === "Preparing" ||
    orderStatus === "On the Way" ||
    orderStatus === "Pick up Ready"
  ) {
    await OrderSummary.updateOne(
      { _id: msg.orderId },
      {
        $set: {
          orderStatus: msg.orderStatus,
          deliveryStatus: "New Order",
        },
      }
    );
    // query = `update OrderSummary set orderStatus = '${orderStatus}', deliveryStatus = 'New Order' where orderid = '${orderId}';`;
  } else if (orderStatus === "Delivered" || orderStatus === "Picked Up") {
    await OrderSummary.updateOne(
      { _id: msg.orderId },
      {
        $set: {
          orderStatus: msg.orderStatus,
          deliveryStatus: "Delivered",
        },
      }
    );
    //query = `update OrderSummary set orderStatus = '${orderStatus}', deliveryStatus = 'Delivered' where orderid = '${orderId}';`;
  } else if (orderStatus === "Cancelled") {
    await OrderSummary.updateOne(
      { _id: msg.orderId },
      {
        $set: {
          orderStatus: msg.orderStatus,
          deliveryStatus: "Cancelled",
        },
      }
    );
    // query = `update OrderSummary set orderStatus = "Cancelled", deliveryStatus = 'Cancelled' where orderid = '${orderId}';`;
  }
  orderData = await OrderSummary.findById(msg.orderId);

    callback(null, orderData);
  } catch (err) {
    console.log(" updateorderdetails in catch error ala");
    callback("An error occurred please try again!", null);
  }
}

exports.handle_request = handle_request;

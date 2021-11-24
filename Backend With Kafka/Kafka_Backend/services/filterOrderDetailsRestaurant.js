const OrderSummary = require("../models/OrderSummary");
async function handle_request(msg, callback) {
  console.log("Inside get all customer orders details backend");
console.log("rrrrreeeqquuuuury",msg.reqQuery)
  try { 
      let query;
    console.log("0");
      //fields to exclude--we dont want to match it as a field
    const removeFields = ["select", "sort"];
    console.log("01");
    //loop over removefields and delete them from msg.reqQuery
    removeFields.forEach((param) => delete msg.reqQuery[param]);
    console.log("1");
    //crate queryString
    let queryStr = JSON.stringify(msg.reqQuery);
    console.log("11");
    //loop over removefields and delete them from msg.reqQuery
    removeFields.forEach((param) => delete msg.reqQuery[param]);
    console.log("111");
    //create operators
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
  
    //console.log("query++++++++++",queryStr);
    //finding resources
    query = OrderSummary.find({
      restid: msg.body.restid,
      deliveryStatus: msg.body.deliveryStatus,
    }).limit(parseInt(msg.reqQuery.limit));
    console.log("11111");
    //select field
    if (msg.reqQuery.select) {
      //split it and join back to convert to string
      const fields = msg.reqQuery.select.split(",").join(" ");
      console.log(fields);
      query = query.select(fields);
    }
  
    //sort
    if (msg.reqQuery.sort) {
      const sortBy = msg.reqQuery.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    console.log("111111");
    //pagination-- msg.reqQuery.page String asnar so..
    const page = parseInt(msg.reqQuery.page, 10) || 1;
    const limit = parseInt(msg.reqQuery.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await OrderSummary.countDocuments({ restid: msg.id });
  
    // query = query.skip(startIndex).limit(limit);
    // console.log("query after skip", query);
  
    const orderData = await query;
    console.log("99999999");
    //pagination result
    const pagination = {};
  
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
  
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  console.log("order data", orderData)
data={orderData, pagination, count:orderData.length}

    callback(null, data);
  } catch (err) {
    console.log(" order for cutomer");
    callback("An error occurred please try again!", null);
  }
}

exports.handle_request = handle_request;

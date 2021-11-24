const OrderSummary = require("../models/OrderSummary");
async function handle_request(msg, callback) {
  console.log("Inside get all customer orders details backend");
  console.log(msg.reqQuery.limit);
  try {
     //fields to exclude--we dont want to match it as a field
  const removeFields = ["select", "sort"];

  //loop over removefields and delete them from msg.reqQuery
  removeFields.forEach((param) => delete msg.reqQuery[param]);

  //crate queryString
  let queryStr = JSON.stringify(msg.reqQuery);

  //loop over removefields and delete them from msg.reqQuery
  removeFields.forEach((param) => delete msg.reqQuery[param]);

  //create operators
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  console.log("query", queryStr);

  //finding resources
  query = OrderSummary.find(JSON.parse(queryStr));

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
  console.log("msg query limit -----------------------------------", msg.reqQuery );
  //pagination-- req.query.page String asnar so..
  const page = parseInt(msg.reqQuery.page, 10) || 1;
  const limit = parseInt(msg.reqQuery.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await OrderSummary.countDocuments({ restid: msg.id });

  query = query.skip(startIndex).limit(limit);
  // console.log("query after skip", query);

  const orderData = await query;

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
data={orderData, pagination, count:orderData.length}

    callback(null, data);
  } catch (err) {
    console.log(" order for cutomer");
    callback("An error occurred please try again!", null);
  }
}

exports.handle_request = handle_request;

const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Dish = require("../models/Dish");
const OrderSummary = require("../models/OrderSummary");
const OrderDishes = require("../models/OrderDishes");
const asyncHandler = require('../middleware/async');

//@desc     Add order Details in OrderSummary and OrderDishes
//@route    POST /api/v1/orders/
//@access   Private
exports.addOrderDetails = asyncHandler(async (req, res, next)=>{
 
    //check if user is restaurant owner
    if(req.user.role!== 'customer'){
        return next(new ErrorResponse(`Only customers can add new orders!`));
    }

    const cart = req.body.cart;

    //create payload for orderSummary
    const orderSummaryPayload = {custName: cart.custName, custid: cart.custid, modeOfDelivery: cart.modeOfDelivery, restName: cart.restName, 
    restid: cart.restid, specialInstructions:req.body.specialInstructions, total:req.body.total, address:req.body.address, quantity:req.body.quantity, uniqueItems:req.body.uniqueItems, orderStatus: "Order Received", deliveryStatus: "New Order", dishes:req.body.items }

    const orderData = await OrderSummary.create(orderSummaryPayload);

     //create payload for orderDishes
   // const orderDishesPayload = {orderid: orderData._id, dishes }

   // const orderDishes = await OrderDishes.create(orderDishesPayload);

    
    
   // return order details and dishes
    res.status(201).json({
        success: true,
        data: {
            orderDetails: {
                orderid:orderData._id ,
                custid: orderData.custid,
                restid: orderData.restid,
                total: orderData.total,
                custName:  orderData.custName,
                restName:  orderData.restname,
                orderStatus:  orderData.orderStatus,
                modeOfDelivery:  orderData.modeOfDelivery,
                address:  orderData.address,
                deliveryStatus:  orderData.deliveryStatus,
                specialInstructions: orderData.specialInstructions,
                quantity: orderData.quantity,
                uniqueItems:orderData.uniqueItems
                }, orderDishes:orderData.dishes}
    });
});


//@desc     Get details of an order with order id
//@route    GET /api/v1/orders/:id
//@access   Private
exports.getOrderDetails = asyncHandler(async (req, res, next)=>{
   
    //check if order exists
   const orderData = await OrderSummary.findById(req.params.id);
    if(!orderData){
        return next(new ErrorResponse(`No order found with id ${req.params.id}`, 404));
    }
    
      // return order details and dishes
      res.status(201).json({
        success: true,
        data: {
            orderDetails: {
                orderid:orderData._id ,
                custid: orderData.custid,
                restid: orderData.restid,
                total: orderData.total,
                custName:  orderData.custName,
                restName:  orderData.restName,
                orderStatus:  orderData.orderStatus,
                modeOfDelivery:  orderData.modeOfDelivery,
                address:  orderData.address,
                deliveryStatus:  orderData.deliveryStatus,
                createdAt: orderData.createdAt,
                specialInstructions: orderData.specialInstructions,
                quantity:orderData.quantity,
                uniqueItems:orderData.uniqueItems
                }, orderDishes:orderData.dishes}
    });
});

//@desc     Get details of an order with customer id
//@route    GET /api/v1/orders/customer/:id/
//@access   Private
exports.getAllOrdersCustomer = asyncHandler(async (req, res, next)=>{
    let query;
    //copy req.query
    const reqQuery = { ...req.query };
//fields to exclude--we dont want to match it as a field
  const removeFields =['select', 'sort', 'page', 'limit']

  //loop over removefields and delete them from reqQuery
    removeFields.forEach(param=> delete reqQuery[param]);

    //crate queryString
    let queryStr = JSON.stringify(req.query);

    //loop over removefields and delete them from reqQuery
    removeFields.forEach(param=> delete reqQuery[param]);

    //create operators
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
   console.log("query",queryStr);

    //finding resources
      query = OrderSummary.find(JSON.parse(queryStr));

       //select field
     if(req.query.select){
         //split it and join back to convert to string
         const fields = req.query.select.split(',').join(' ');
         console.log(fields)
         query = query.select(fields);
     }

     //sort
     if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
     }else{
         query = query.sort('-createdAt');
     }

//pagination-- req.query.page String asnar so..
     const page = parseInt(req.query.page, 10) || 1;
     const limit = parseInt(req.query.limit, 10) || 25;
     const startIndex = (page-1) * limit;
     const endIndex = (page) * limit;
     const total = await OrderSummary.countDocuments({custid:req.user.id});

     query = query.skip(startIndex).limit(limit);
     // console.log("query after skip", query);

     const orderData = await query

 //pagination result
      const pagination = {};

      if(endIndex < total){
                pagination.next={
                    page:page +1,   
                    limit
                }
            }
        
            if(startIndex > 0){
                pagination.prev={
                    page:page -1,
                    limit
                }
            }

//     //check if order exists
//    const orderData = await OrderSummary.find({custid: req.params.id});
//     if(!orderData){
//         return next(new ErrorResponse(`No order found with id ${req.params.id}`, 404));
//     }
    console.log("orderData starts",orderData)
      // return order details and dishes
      res.status(200).json({
        success: true,
        data: orderData, pagination, count:orderData.length
    });
});



//@desc     Get details of an order with restaurant id
//@route    GET /api/v1/orders/restaurant/:id/
//@access   Private
exports.getAllOrdersRestaurant = asyncHandler(async (req, res, next)=>{
   



    let query;
    //copy req.query
    const reqQuery = { ...req.query };
//fields to exclude--we dont want to match it as a field
  const removeFields =['select', 'sort', 'page', 'limit']

  //loop over removefields and delete them from reqQuery
    removeFields.forEach(param=> delete reqQuery[param]);

    //crate queryString
    let queryStr = JSON.stringify(req.query);

    //loop over removefields and delete them from reqQuery
    removeFields.forEach(param=> delete reqQuery[param]);

    //create operators
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
   console.log("query",queryStr);

    //finding resources
      query = OrderSummary.find(JSON.parse(queryStr));

       //select field
     if(req.query.select){
         //split it and join back to convert to string
         const fields = req.query.select.split(',').join(' ');
         console.log(fields)
         query = query.select(fields);
     }

     //sort
     if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
     }else{
         query = query.sort('-createdAt');
     }

//pagination-- req.query.page String asnar so..
     const page = parseInt(req.query.page, 10) || 1;
     const limit = parseInt(req.query.limit, 10) || 25;
     const startIndex = (page-1) * limit;
     const endIndex = (page) * limit;
     const total = await OrderSummary.countDocuments({restid:req.user.id});

     query = query.skip(startIndex).limit(limit);
     // console.log("query after skip", query);

     const orderData = await query

 //pagination result
      const pagination = {};

      if(endIndex < total){
                pagination.next={
                    page:page +1,   
                    limit
                }
            }
        
            if(startIndex > 0){
                pagination.prev={
                    page:page -1,
                    limit
                }
            }





//     //check if order exists
//    const orderData = await OrderSummary.find({restid: req.params.id});
 
    
      // return order details and dishes
      res.status(200).json({
        success: true,
        data:orderData, pagination, count:orderData.length
    });
});



//@desc     Get details of an order with customer id and order status filter
//@route    POST /api/v1/orders/filterCustomer:id
//@access   Private
exports.filterOrderDetailsCust = asyncHandler(async (req, res, next)=>{
   
    
 
   let query;
   //copy req.query
   console.log("reqquery", typeof(req.query.limit))
   const reqQuery = { ...req.query };
//fields to exclude--we dont want to match it as a field
 const removeFields =['select', 'sort', 'page', 'limit']

 //loop over removefields and delete them from reqQuery
   removeFields.forEach(param=> delete reqQuery[param]);

   //crate queryString
   let queryStr = JSON.stringify(req.query);

   //loop over removefields and delete them from reqQuery
   removeFields.forEach(param=> delete reqQuery[param]);

   //create operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);

  
  //console.log("query++++++++++",queryStr);
   //finding resources
     query = OrderSummary.find({orderStatus:req.body.orderStatus, custid:req.body.custid}).limit(Number(req.query.limit));

      //select field
    if(req.query.select){
        //split it and join back to convert to string
        const fields = req.query.select.split(',').join(' ');
        console.log(fields)
        query = query.select(fields);
    }

    //sort
    if(req.query.sort){
       const sortBy = req.query.sort.split(',').join(' ');
       query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }

//pagination-- req.query.page String asnar so..
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page-1) * limit;
    const endIndex = (page) * limit;
    const total = await OrderSummary.countDocuments({custid:req.user.id});

   // query = query.skip(startIndex).limit(limit);
    // console.log("query after skip", query);

    const orderData = await query

//pagination result
     const pagination = {};

     if(endIndex < total){
               pagination.next={
                   page:page +1,   
                   limit
               }
           }
       
           if(startIndex > 0){
               pagination.prev={
                   page:page -1,
                   limit
               }
           }

//     //check if order exists
//    const orderData = await OrderSummary.find({custid: req.params.id});
//     if(!orderData){
//         return next(new ErrorResponse(`No order found with id ${req.params.id}`, 404));
//     }
   console.log("orderData starts",orderData)
     // return order details and dishes
     res.status(200).json({
       success: true,
       data: orderData, pagination, count:orderData.length
   });
});



//@desc     Get details of an order with restaurant id and order status filter
//@route    POST /api/v1/orders/filterRestaurant/:id
//@access   Private
exports.filterOrderDetailsRest = asyncHandler(async (req, res, next)=>{
   
  
 
    let query;
    //copy req.query
    console.log("reqquery", typeof(req.query.limit))
    const reqQuery = { ...req.query };
 //fields to exclude--we dont want to match it as a field
  const removeFields =['select', 'sort', 'page', 'limit']
 
  //loop over removefields and delete them from reqQuery
    removeFields.forEach(param=> delete reqQuery[param]);
 
    //crate queryString
    let queryStr = JSON.stringify(req.query);
 
    //loop over removefields and delete them from reqQuery
    removeFields.forEach(param=> delete reqQuery[param]);
 
    //create operators
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
 
   
   //console.log("query++++++++++",queryStr);
    //finding resources
    query = OrderSummary.find({restid: req.body.restid, deliveryStatus: req.body.deliveryStatus}).limit(Number(req.query.limit));
    
 
       //select field
     if(req.query.select){
         //split it and join back to convert to string
         const fields = req.query.select.split(',').join(' ');
         console.log(fields)
         query = query.select(fields);
     }
 
     //sort
     if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
     }else{
         query = query.sort('-createdAt');
     }
 
 //pagination-- req.query.page String asnar so..
     const page = parseInt(req.query.page, 10) || 1;
     const limit = parseInt(req.query.limit, 10) || 25;
     const startIndex = (page-1) * limit;
     const endIndex = (page) * limit;
     const total = await OrderSummary.countDocuments({restid:req.user.id});
 
    // query = query.skip(startIndex).limit(limit);
     // console.log("query after skip", query);
 
     const orderData = await query
 
 //pagination result
      const pagination = {};
 
      if(endIndex < total){
                pagination.next={
                    page:page +1,   
                    limit
                }
            }
        
            if(startIndex > 0){
                pagination.prev={
                    page:page -1,
                    limit
                }
            }

    //check if order exists
  
    if(!orderData){
        return next(new ErrorResponse(`No order found`, 404));
    }
    
      // return order details and dishes
      res.status(200).json({
        success: true,
        data:orderData, pagination, count:orderData.length
    });
});


//@desc     Update order status
//@route    PUT /api/v1/orders/
//@access   Private
exports.updateOrderStatus = asyncHandler(async (req, res, next)=>{

    let order = await OrderSummary.findById(req.body.orderId);
    
    if(!order){
        return next(new ErrorResponse(`Order not found with id ${req.body.orderId}`, 404));
    }

    //make sure that user is restaurant owner
    //converting Object id to string
    // if((order.restid.toString() !== req.user.id || req.user.role !== 'restaurant') &&(req.user.role === 'restaurant')){
    //     return next(new ErrorResponse(`Only owner of this restaurant can change the status of order`, 401));
    // }

    //update order status according to delivery type
    let orderData;
    const orderid = req.body.orderId;
    const orderStatus = req.body.orderStatus;
    if (
      orderStatus === "Order Received" ||
      orderStatus === "Preparing" ||
      orderStatus === "On the Way" ||
      orderStatus === "Pick up Ready"
    ) {
         await OrderSummary.updateOne({_id:req.body.orderId}, {$set: {orderStatus: req.body.orderStatus, deliveryStatus : 'New Order'}});
     // query = `update OrderSummary set orderStatus = '${orderStatus}', deliveryStatus = 'New Order' where orderid = '${orderId}';`;
    } else if (orderStatus === "Delivered" || orderStatus === "Picked Up") {
         await OrderSummary.updateOne({_id:req.body.orderId}, {$set: {orderStatus: req.body.orderStatus, deliveryStatus : 'Delivered'}});
        //query = `update OrderSummary set orderStatus = '${orderStatus}', deliveryStatus = 'Delivered' where orderid = '${orderId}';`;
    }else if (orderStatus === "Cancelled") {
         await OrderSummary.updateOne({_id:req.body.orderId}, {$set: {orderStatus: req.body.orderStatus, deliveryStatus : 'Cancelled'}});
       // query = `update OrderSummary set orderStatus = "Cancelled", deliveryStatus = 'Cancelled' where orderid = '${orderId}';`;
      }
      orderData = await OrderSummary.findById(req.body.orderId);

    res.status(200).json({
        success: true,
        data: {orderStatus: orderData.orderStatus, deliveryStatus: orderData.deliveryStatus}
    });
});

//@desc     Get a dish by id
//@route    GET /api/v1/dishes/:id
//@access   Private
exports.getDish = asyncHandler(async (req, res, next)=>{

    //get dishes for a restaurant
    const dish = await Dish.find({_id: req.params.id})
   
    //check if there are any dishes
    if(!dish){
        return next(new ErrorResponse(`No dish found with id ${req.params.id}`, 400));
    }
    
    res.status(200).json({
        success: true,
        data: dish
    });
});
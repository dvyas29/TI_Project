const ErrorResponse = require("../utils/errorResponse");
const DeliveryAddress = require("../models/DeliveryAddress");
const asyncHandler = require('../middleware/async');

//@desc     Add a Delivery Address
//@route    POST /api/v1/deliveryAddress
//@access   Private
exports.addDeliveryAddress = asyncHandler(async (req, res, next)=>{
    
    //check if user is customer
    if(req.user.role!== 'customer'){
        return next(new ErrorResponse(`Only customers can add new address!`));
    }

     const address = await DeliveryAddress.create(req.body);
    res.status(201).json({
        success: true,
        data: address
    });
});


//@desc     Get all addresses of a customer
//@route    GET /api/v1/deliveryAddresses/:id
//@access   Private
exports.getDeliveryAddress = asyncHandler(async (req, res, next)=>{

    //get dishes for a restaurant
    const address = await DeliveryAddress.find({custid: req.params.id})
   
    res.status(200).json({
        success: true,
        data: address
    });
});


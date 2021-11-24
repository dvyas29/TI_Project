const ErrorResponse = require("../utils/errorResponse");
const DeliveryAddress = require("../models/DeliveryAddress");
const asyncHandler = require('../middleware/async');
var kafka = require('../kafka/client');
//@desc     Add a Delivery Address
//@route    POST /api/v1/deliveryAddress
//@access   Private
exports.addDeliveryAddress = asyncHandler(async (req, res, next)=>{
    kafka.make_request('post_deliveryAddresses', req.body,  function(err, results){
        console.log("resultsssssssssss", results)
        console.log("errorrrrrr", err)

     //check if user is customer
    if(req.user.role!== 'customer'){
        return next(new ErrorResponse(`Only customers can add new address!`));
    }

    if(err){
        console.log("error in controller from service");
        res.status(400).json({
            success: false,
            data: err
           
            
        });
        return

    }

        // if(results && results.success!=true){
        //     res.status(400).json({
        //         success: false,
        //         data: null
        //     });
        // }else{
            res.status(201).json({
                success: true,
                data: results
            });
        // }
    })
   

    //  const address = await DeliveryAddress.create(req.body);
   
});




//@desc     Get all addresses of a customer
//@route    GET /api/v1/deliveryAddresses/:id
//@access   Private
exports.getDeliveryAddress = asyncHandler(async (req, res, next)=>{

    kafka.make_request('get_deliveryAddresses', req.params.id,  function(err, results){
        console.log("resultsssssssssss", results)
        console.log("errorrrrrr", err)

     //check if user is customer
    if(req.user.role!== 'customer'){
        return next(new ErrorResponse(`Only customers can fetch the addresses!`));
    }

    if(err){
        console.log("error in controller from service");
        res.status(400).json({
            success: false,
            data: err        
        });
        return
    }
            res.status(201).json({
                success: true,
                data: results
            });
    })
});


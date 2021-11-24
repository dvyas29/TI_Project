const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Dish = require("../models/Dish");
const asyncHandler = require('../middleware/async');

//@desc     Get all restaurants based on customer location
//@route    GET /api/v1/restaurants
//@access   Private
exports.getAllRest = asyncHandler(async (req, res, next)=>{
   
   const userLocation = req.user.location;

    const withLocation = await User.find({role:"restaurant", userLocation});
    const withoutLocation = await User.find({role:"restaurant", location:!userLocation});

    const restList = [...withLocation, ...withoutLocation];


    if(!restList){
        return next(new ErrorResponse(`Sorry! Could not find any reataurant for you.`, 404));
    }
    res.status(200).json({
      restList
    })
});

//@desc     Get all restaurants based on filters and customer location
//@route    POST /api/v1/restaurants/
//@access   Private
exports.filteredRests = asyncHandler(async (req, res, next) => {

    //const search = req.body.search;
    const modeOfDelivery = req.body.modeOfDelivery;
    const filter = req.body.filter;
    
    //For filter
    Dish.find({type: filter}, {restid: 1}, async function(err, filteredRestIdsAndCorresponding_id) {
   
    
        // Map the filteredRestIdsAndCorresponding_id into an array of just the _ids
        console.log("filteredRestIdsAndCorresponding_id",filteredRestIdsAndCorresponding_id)
        var ids = filteredRestIdsAndCorresponding_id.map(function(filteredRestIdsAndCorresponding_id) { return filteredRestIdsAndCorresponding_id.restid; });
        console.log("ids",ids)

        //Check for delivery
          var idsnew = ids.map(async function(id) { return await User.find({_id: id, modeOfDelivery}); });
         console.log("ids after",idsnew)
        // Get the companies whose founders are in that set.
        User.find({_id: {$in: idsnew}}, function(err, Rests) {
            // Rests contains your answer
            
            res.status(200).json({
              success: true,
              data: Rests
            });
        });
      });

    //For modeOfDelivery

    
    //For search


   });

const ErrorResponse = require("../utils/errorResponse");
const Favorites = require("../models/Favorites");
const User = require("../models/User")
const asyncHandler = require("../middleware/async");
var kafka = require('../kafka/client');


//@desc     Add to favorites
//@route    POST /api/v1/favorites
//@access   Private
exports.addFavs = asyncHandler(async (req, res, next) => {

//check if user is customer
if (req.user.role !== "customer") {
  return next(new ErrorResponse(`Only customers can add restaurants to favorites!`), 401);
}

  kafka.make_request('post_addFavs', req.body, function(error, results){
  //check if already present
  // let pair = await Favorites.find({
  //   custid: req.body.custid,
  //   restid: req.body.restid,
  // });
  // //console.log("pair.lrmgth", pair);
  // if (pair.length > 0) {
  //   return next(new ErrorResponse(`Already favorite`), 400);
  // }


  

  if(error){
    if(error.msg==="Allready favorite!"){
      return next(new ErrorResponse(`Already favorite`), 400);
    }
    res.status(400).json({
        success: false,
        data: "Internal server error"        
    });
    return
}
        res.status(201).json({
            success: true,
            data: results
        });

});
});

//@desc     Get all favorite restaurants of a customer (for rendering on favorites page)
//@route    GET /api/v1/favorites/:id
//@access   Private
exports.getFavs = asyncHandler(async (req, res, next) => {

  kafka.make_request('get_getFavs', req.params, function(error, results){


    if(error){
      
      res.status(400).json({
          success: false,
          data: "Internal server error"        
      });
      return
  }
          res.status(201).json({
              success: true,
              data: results
          });



//  // Get the _ids of Users (restaurants) which are in favourites.
// Favorites.find({custid: req.params.id}, {restid: 1}, function(err, filteredRestIdsAndCorresponding_id) {

 
//   // Map the filteredRestIdsAndCorresponding_id into an array of just the _ids
//   var ids = filteredRestIdsAndCorresponding_id.map(function(filteredRestIdsAndCorresponding_id) { return filteredRestIdsAndCorresponding_id.restid; });
  
//   // Get the companies whose founders are in that set.
//   User.find({_id: {$in: ids}}, function(err, Rests) {
//       // Rests contains your answer
      
//       res.status(200).json({
//         success: true,
//         data: Rests
//       });
//   });
// });
  });
  
});


//@desc     Get if the restaurant is favorite restaurants of a customer or not using cust rest id pair
//@route    GET /api/v1/favorites/:custid/:restid
//@access   Private
exports.getRestAsFav= asyncHandler(async (req, res, next) => {

  kafka.make_request('get_getRestAsFav', req.params, function(error, results){
    // //get favs
    // const data = await Favorites.find({ custid: req.params.custid , restid: req.params.restid });
  

    if(error){
      
      res.status(400).json({
          success: false,
          data: {}        
      });
      return
  }
          res.status(200).json({
              success: true,
              data:results
          });


    // res.status(200).json({
    //   success: true,
    //   data,
    // });
  });
  });


//@desc     Remove restaurant from favorites list
//@route    DELETE /api/v1/favorites
//@access   Private
exports.removeFavs = asyncHandler(async (req, res, next) => {
console.log("in rmfavs")

kafka.make_request('delete_removeFavs', req.body, function(error, results){

if(error){
  if(error.msg==="No Record found"){
    return next(new ErrorResponse(`No Record found`), 400);
  }
  res.status(400).json({
      success: false,
      data: "Internal server error"        
  });
  return
}
      res.status(200).json({
          success: true,
          data: results
      });


//     //check if it is there
//     const fav = await Favorites.find({ custid: req.body.custid , restid: req.body.restid });
  
// console.log("fav", fav, req.body)
//   if (!fav) {
//     return next(new ErrorResponse(`No Record found`, 404));
//   }
  console.log("b4 delete")

  // //delete the document with favorite pair
  // await Favorites.findOneAndDelete({ custid: req.body.custid, restid: req.body.restid });

  // console.log("after delete")

  // //return all the favorites
  // const favs = await Favorites.find();

    });
});

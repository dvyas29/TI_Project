const ErrorResponse = require("../utils/errorResponse");
const Favorites = require("../models/Favorites");
const User = require("../models/User")
const asyncHandler = require("../middleware/async");

//@desc     Add to favorites
//@route    POST /api/v1/favorites
//@access   Private
exports.addFavs = asyncHandler(async (req, res, next) => {
  //check if already present
  let pair = await Favorites.find({
    custid: req.body.custid,
    restid: req.body.restid,
  });
  //console.log("pair.lrmgth", pair);
  if (pair.length > 0) {
    return next(new ErrorResponse(`Already favorite`), 400);
  }
  //check if user is customer
  if (req.user.role !== "customer") {
    return next(new ErrorResponse(`Only customers can add restaurants to favorites!`), 401);
  }

  const fav = await Favorites.create(req.body);
  res.status(200).json({
    success: true,
    data: fav,
  });
});

//@desc     Get all favorite restaurants of a customer (for rendering on favorites page)
//@route    GET /api/v1/favorites/:id
//@access   Private
exports.getFavs = asyncHandler(async (req, res, next) => {

 // Get the _ids of Users (restaurants) which are in favourites.
Favorites.find({custid: req.params.id}, {restid: 1}, function(err, filteredRestIdsAndCorresponding_id) {

 
  // Map the filteredRestIdsAndCorresponding_id into an array of just the _ids
  var ids = filteredRestIdsAndCorresponding_id.map(function(filteredRestIdsAndCorresponding_id) { return filteredRestIdsAndCorresponding_id.restid; });
  
  // Get the companies whose founders are in that set.
  User.find({_id: {$in: ids}}, function(err, Rests) {
      // Rests contains your answer
      
      res.status(200).json({
        success: true,
        data: Rests
      });
  });
});

  
});


//@desc     Get if the restaurant is favorite restaurants of a customer or not using cust rest id pair
//@route    GET /api/v1/favorites/:custid/:restid
//@access   Private
exports.getRestAsFav= asyncHandler(async (req, res, next) => {
    //get dishes for a restaurant
    const data = await Favorites.find({ custid: req.params.custid , restid: req.params.restid });
  
    res.status(200).json({
      success: true,
      data,
    });
  });


//@desc     Remove restaurant from favorites list
//@route    DELETE /api/v1/favorites
//@access   Private
exports.removeFavs = asyncHandler(async (req, res, next) => {
console.log("in rmfavs")

    //check if it is there
    const fav = await Favorites.find({ custid: req.body.custid , restid: req.body.restid });
  
console.log("fav", fav, req.body)
  if (!fav) {
    return next(new ErrorResponse(`No Record found`, 404));
  }
  console.log("b4 delete")

  //delete the document with favorite pair
  await Favorites.findOneAndDelete({ custid: req.body.custid, restid: req.body.restid });

  console.log("after delete")

  //return all the favorites
  const favs = await Favorites.find();

  res.status(200).json({
    success: true,
    data: favs,
  });
});

const Favorites = require("../models/Favorites");
const User = require("../models/User");
async function handle_request(msg, callback) {
  console.log("Inside getfffffffffffff Favs backend");
  //console.log(msg);
  //check if user is customer
//   if(req.user.role!== 'customer'){
//       return next(new ErrorResponse(`Only customers can add new address!`));
//   }
  try {

 // Get the _ids of Users (restaurants) which are in favourites.
 Favorites.find({custid: msg.id}, {restid: 1}, function(err, filteredRestIdsAndCorresponding_id) {

    // Map the filteredRestIdsAndCorresponding_id into an array of just the _ids
    var ids = filteredRestIdsAndCorresponding_id.map(function(filteredRestIdsAndCorresponding_id) { return filteredRestIdsAndCorresponding_id.restid; });
    
    // Get the companies whose founders are in that set.
    User.find({_id: {$in: ids}}, function(err, Rests) {
        // Rests contains your answer
        if(err){
            callback(err, null);
        }
        if(Rests){callback(null, Rests);}
    });
  });

  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

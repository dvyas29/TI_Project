const Favorites = require("../models/Favorites");
const User = require("../models/User");
async function handle_request(msg, callback) {
  console.log("Inside get rest as  Favs backend");
  //console.log(msg);
  //check if user is customer
//   if(req.user.role!== 'customer'){
//       return next(new ErrorResponse(`Only customers can add new address!`));
//   }
  try {

 //get dishes for a restaurant
 const data = await Favorites.find({ custid: msg.custid , restid: msg.restid });
 console.log("dataaaaaaaaaaaaaaaaaa", data)
        if(!data){
            const err={}
        err.msg="No favorite!";
        err.statusCode=400;

        callback(err, null);
       return;
        }
        if(data){
            console.log("dataaaaaaaaaaaaaaaaaa", data)
            callback(null, data);
        }
    
 

  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

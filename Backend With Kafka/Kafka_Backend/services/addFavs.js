const Favorites = require("../models/Favorites");
async function handle_request(msg, callback) {
  console.log("Inside get delivery addresses backend");
 // console.log(msg);

  //check if user is customer
//   if(req.user.role!== 'customer'){
//       return next(new ErrorResponse(`Only customers can add new address!`));
//   }
  try {
    let pair = await Favorites.find({
        custid: msg.custid,
        restid: msg.restid,
      });
      //console.log("pair.lrmgth", pair);
      if (pair.length > 0) {
        const err={}
        err.msg="Allready favorite!";
        err.statusCode=400;

        callback(err, null);
       return ;
      }

      const fav = await Favorites.create(msg);
    
   
    callback(null, fav);
    console.log("after callback");
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

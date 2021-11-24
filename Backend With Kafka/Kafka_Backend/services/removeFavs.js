const Favorites = require("../models/Favorites");
const User = require("../models/User");
async function handle_request(msg, callback) {
  console.log("Inside remove favs backend");

  try {
  //check if it is there
  const fav = await Favorites.find({ custid: msg.custid , restid: msg.restid });
  

    if (!fav) {
     
      const err={}
      err.msg="No Record found";
      err.statusCode=400;

      callback(err, null);
     return ;
    }

  //delete the document with favorite pair
  await Favorites.findOneAndDelete({ custid: msg.custid, restid: msg.restid });

  console.log("after delete")

  //return all the favorites
  const favs = await Favorites.find();
  callback(null, favs);

    
  } catch (err) {
       console.log("in service err")
       console.log("+++++++error in servic catch++++++++", err)
    callback(err.name, null);
  }
}

exports.handle_request = handle_request;

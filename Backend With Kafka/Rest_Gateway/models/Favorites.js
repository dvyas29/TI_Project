const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
   custid:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:true
   },
   restid:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
   }
});

module.exports = mongoose.model('Favorites', FavoritesSchema);
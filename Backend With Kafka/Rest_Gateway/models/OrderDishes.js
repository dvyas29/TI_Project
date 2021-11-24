const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const OrderDishesSchema = new mongoose.Schema({

   
    orderid :{
        type: mongoose.Schema.ObjectId,
       ref: 'OrderSummary',
       required: true
    },
   dishes: [Object],
   
   createdAt:{
    type: Date,
    default:Date.now
}

});



module.exports = mongoose.model('OrderDishes', OrderDishesSchema);
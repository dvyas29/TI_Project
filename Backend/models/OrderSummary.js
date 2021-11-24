const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const OrderSummarySchema = new mongoose.Schema({

    custid :{
        type: mongoose.Schema.ObjectId,
       ref: 'User',
       required: true
    },
    restid :{
        type: mongoose.Schema.ObjectId,
       ref: 'User',
       required: true
    },
   
    total : SchemaTypes.Double,
    
    custName : String,
    restName: String,
    modeOfDelivery:{
        type:String,
        enum:['delivery', 'pick up']
    },
    orderStatus :{
        type:String,
        enum:['Order Received', 'Preparing', 'On the way', 'Delivered', 'Pick up Ready', 'Picked up', 'Cancelled']
    },
    address : String,
    deliveryStatus:{
        type:String,
        enum:['New Order', 'Delivered Order', 'Cancelled Order']
    },
   dishes:[Object],
   
   specialInstructions: String,
   uniqueItems: Number,
   quantity: Number,

    createdAt:{
        type: Date,
        default:Date.now
    }

});



module.exports = mongoose.model('OrderSummary', OrderSummarySchema);
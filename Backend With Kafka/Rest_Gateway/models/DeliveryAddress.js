const mongoose = require("mongoose");

const DeliveryAddressSchema = new mongoose.Schema({
    custid:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },

    address:{
        type: String,
        minlength:[true, 'Address should be minimum 15 characters long!']
    }
});

module.exports = mongoose.model('DeliveryAddress', DeliveryAddressSchema);
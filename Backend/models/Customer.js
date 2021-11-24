const mongoose = require("mongoose");

const CustomerSchema = new mongoose({
    credid:{
        type: mongoose.Schema.ObjectId,
        ref: 'Creds',
        required:true
    },
    email:{
        type: mongoose.Schema.email,
        ref: 'Creds',
        required:true
    },
    name:{ type: mongoose.Schema.name,
        ref: 'Creds',
        required:true
    },
    DOB : Date,
    city: String,
    state : String,
    country : String,
    nickname : String,
    phone : Number,
    profileUrl:{
        type: String,
        maxlength:300
    },
    about :{
        type: String,
        maxlength: [100, "About information can not be more than 100 characters"]
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
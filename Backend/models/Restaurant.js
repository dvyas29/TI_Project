const mongoose = require("mongoose");

const RestaurantSchema = new mongoose({
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
    location:{ type: mongoose.Schema.location,
        ref: 'Creds',
        required:true
    },

    description:{
        type: String,
        maxlength: [200, 'Description can not be more than 200 characters']
    },
   
    timing: String,
    modeOfDelivery:{
        type:String,
        enum:['delivery', 'pick up', 'pick up and delivery']
    },

    phone : Number,
    profileUrl:{
        type: String,
        maxlength:300
    },
   
    createdAt:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
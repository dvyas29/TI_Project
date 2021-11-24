const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please add a name'],
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
    },
    role:{
        type: String,
        enum:['customer', 'restaurant'],
        default:'customer'
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength:[8, 'Password should be at least 8 characters long'],
        select: false, //hyane kay hoil ki jevha retrieve kru user cha data tevha password janar nahi tyat
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
    location: String,

    description:{
        type: String,
        maxlength: [200, 'Description can not be more than 200 characters']
    },
   
    timing: String,
    modeOfDelivery:{
        type:String,
        enum:['delivery', 'pick up', 'pick up and delivery']
    },

    createdAt:{
        type: Date,
        default:Date.now
    }

});

//Encrypt the password using bcrypt

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    const payload = {id: this._id, name: this.name, location: this.location, role: this.role};
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//match user entered password to database password
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', UserSchema);
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
var kafka = require("../kafka/client")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc   Register a user
//@route  POST /api/v1/auth/register
//@access Public

exports.register = asyncHandler( async (req, res, next)=>{
    
//    //extract all the things that u want to work with using destructure
//     const { name, email, password, role, location } = req.body;
//     //Create user
//     const user = await User.create({
//         name,
//         email,
//         password,
//         role,
//         location
//     });


kafka.make_request('post_register', req.body, function(error, results){
        console.log("resultsssssssssss", results)
       
          if(error){
            console.log("error in controller from service", error);
            if(error.code===11000){
            res.status(400).json({
                success: false,
                data: `Duplicate fields found. Try with other values.`        
            });
            return;
        }else if(error.name==="CastError"){
            res.status(404).json({
                success: false,
                data: `Resource not found with id of ${error.value}`        
            });
            return;
        }else if(error.name==="ValidationError"){
            res.status(400).json({
                success: false,
                data:  Object.values(err.errors).map(val=>val.message)        
            });
            return;
        }
        }
            sendTokenResponse(results, 200, res);
            // res.status(201).json({
            //     success: true,
            //     data: results
            // });
        
    })

  
    
});

//@desc   Login a user
//@route  POST /api/v1/auth/login
//@access Public

exports.login = asyncHandler( async (req, res, next)=>{
    const { email, password } = req.body;

    //validate email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide email and password both', 400));
    }

    kafka.make_request('login', req.body, function(error, results){
   

        if(error){

            res.status(400).json({
                success: false,
                data: `Invalid attempt to login! Retry with correct credentials`        
            });
            return;

        }else if(results){
//Check if password matches
const ismatch = matchPassword(password);

if(!ismatch){
    return next(new ErrorResponse('Invalid credentials', 401));
}

sendTokenResponse(results, 200, res);
        }
    
});
 });
 
//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res)=>{
    console.log("user", user);
    console.log("statusCode", statusCode);
    console.log("res", res);
    

    //create token
    const token = getSignedJwtToken(user);

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    console.log("sending cookie now")
    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({success: true, role:user.role, id:user._id, name:user.name, accessToken:token
    });
};


//@desc   Get current user
//@route  GET /api/v1/auth/current
//@access Public

exports.current = asyncHandler( async (req, res, next)=>{
    
    res.json(req.user)
     
 });



 const getSignedJwtToken = function(user){
    const payload = {id: user._id, name: user.name, location: user.location, role: user.role};
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};


 const matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
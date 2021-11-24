const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//@desc   Register a user
//@route  POST /api/v1/auth/register
//@access Public

exports.register = asyncHandler( async (req, res, next)=>{
    
   //extract all the things that u want to work with using destructure
    const { name, email, password, role, location } = req.body;

    //Create user
    const user = await User.create({
        name,
        email,
        password,
        role,
        location
    });

    sendTokenResponse(user, 200, res);
    
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
    //find the user first
    const user = await User.findOne({email}).select('+password');

     if(!user){
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    //Check if password matches
    const ismatch = await user.matchPassword(password);

    if(!ismatch){
        return next(new ErrorResponse('Invalid credentials', 401));
    }
   
    sendTokenResponse(user, 200, res);
     
 });
 
//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res)=>{
    console.log("user", user);
    console.log("statusCode", statusCode);
    console.log("res", res);
    //create token
    const token = user.getSignedJwtToken();

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
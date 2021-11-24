const User = require("../models/User")
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");


//@desc     Get User profile
//@route    GET /api/v1/users
//@access   Private

exports.getUserProfile = asyncHandler( async (req, res, next)=>{
    const user = await User.findById(req.user.id);

    //check if user exists
    if(!user){
        return next(new ErrorResponse(`No user exists with id ${req.user.id}`, 400));
    }

    res.status(200).json({
        user
    });
});



//@desc     Get User profile image
//@route    GET /api/v1/users/image
//@access   Private

exports.getImage = asyncHandler( async (req, res, next)=>{
    const data = await User.findById(req.user.id);

    //check if user exists
    if(!data){
        return next(new ErrorResponse(`No profile picture found`, 400));
    }

    res.status(200).json({
        profileUrl:data.profileUrl
    });
});






//@desc     Get User profile from id
//@route    GET /api/v1/users/:id
//@access   Private

exports.getUserProfileFromId = asyncHandler( async (req, res, next)=>{
    const user = await User.findById(req.params.id);

    //check if user exists
    if(!user){
        return next(new ErrorResponse(`No user exists with id ${req.params.id}`, 400));
    }

    res.status(200).json({
        user
    });
});

//@desc     Get User profile from id
//@route    POST /api/v1/users/:id
//@access   Private

exports.getUserProfileFromIdPost = asyncHandler( async (req, res, next)=>{
    const user = await User.findById(req.body.id);

    //check if user exists
    if(!user){
        return next(new ErrorResponse(`No user exists with id ${req.body.id}`, 400));
    }

    res.status(200).json({
        user
    });
});


//@desc     Update User profile
//@route    PUT /api/v1/users
//@access   Private

exports.updateUserProfile = asyncHandler( async (req, res, next)=>{
    let user;
    user = await User.findById(req.user.id);

    //check if user exists
    if(!user){
        return next(new ErrorResponse(`No user exists with id ${req.user.id}`, 400));
    }

    user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});


//@desc     Update User profile image
//@route    PUT /api/v1/users/image
//@access   Private

exports.addImage = asyncHandler( async (req, res, next)=>{
    let user;
    user = await User.findById(req.body.id);

    //check if user exists
    if(!user){
        return next(new ErrorResponse(`No user exists with id ${req.body.id}`, 400));
    }

    user = await User.findByIdAndUpdate(req.body.id, {profileUrl:req.body.url}, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});
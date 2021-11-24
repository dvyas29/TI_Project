const User = require("../models/User")
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
var kafka = require('../kafka/client');

//@desc     Get User profile
//@route    GET /api/v1/users
//@access   Private

exports.getUserProfile = asyncHandler( async (req, res, next)=>{


    const msg = {id: req.user.id }
    kafka.make_request("get_getUserProfile", msg, function (error, user) {
  
     if(error){
         if(error.msg==="No user found"){
             return next(new ErrorResponse(`No user found `, 400));
         }
         
         res.status(500).json({
             success: false,
             msg: "Internal server error"
         });
         
             }else if(user){
                res.status(200).json({
                    user
                });
             }

   });

    // const user = await User.findById(req.user.id);

    // //check if user exists
    // if(!user){
    //     return next(new ErrorResponse(`No user exists with id ${req.user.id}`, 400));
    // }

    // res.status(200).json({
    //     user
    // });
});



//@desc     Get User profile image
//@route    GET /api/v1/users/image
//@access   Private

exports.getImage = asyncHandler( async (req, res, next)=>{
    const msg = req.user.id
    kafka.make_request("get_getImage", msg, function (error, data) {
  
     if(error){
         if(error.msg==="No profile found"){
             return next(new ErrorResponse(`No profile found `, 400));
         }
         
         res.status(500).json({
             success: false,
             msg: "Internal server error"
         });
         
             }else if(data){
                res.status(200).json({
                    profileUrl:data.profileUrl
                });
             }

   });
    // const data = await User.findById(req.user.id);

    // //check if user exists
    // if(!data){
    //     return next(new ErrorResponse(`No profile picture found`, 400));
    // }

    // res.status(200).json({
    //     profileUrl:data.profileUrl
    // });
});






//@desc     Get User profile from id
//@route    GET /api/v1/users/:id
//@access   Private

exports.getUserProfileFromId = asyncHandler( async (req, res, next)=>{

    const msg = {...req.params}
    kafka.make_request("get_getUserProfileFromId", msg, function (error, user) {
  
     if(error){
         if(error.msg==="No user found"){
             return next(new ErrorResponse(`No user found `, 400));
         }
         
         res.status(500).json({
             success: false,
             msg: "Internal server error"
         });
         
             }else if(user){
                res.status(200).json({
                    user
                });
             }

   });
    // const user = await User.findById(req.params.id);

    // //check if user exists
    // if(!user){
    //     return next(new ErrorResponse(`No user exists with id ${req.params.id}`, 400));
    // }

    // res.status(200).json({
    //     user
    // });
});

//@desc     Get User profile from id
//@route    POST /api/v1/users/:id
//@access   Private

exports.getUserProfileFromIdPost = asyncHandler( async (req, res, next)=>{
    const msg = { body:req.body }
    kafka.make_request("post_getUserProfileFromIdPost", msg, function (error, user) {
     if(error){
         if(error.msg==="No user found"){
             return next(new ErrorResponse(`No user found `, 400));
         }
         res.status(500).json({
             success: false,
             msg: "Internal server error"
         });
             }else if(user){
                res.status(200).json({
                    user
                });
             }
   });
    // const user = await User.findById(req.body.id);

    // //check if user exists
    // if(!user){
    //     return next(new ErrorResponse(`No user exists with id ${req.body.id}`, 400));
    // }

    // res.status(200).json({
    //     user
    // });
});


//@desc     Update User profile
//@route    PUT /api/v1/users
//@access   Private

exports.updateUserProfile = asyncHandler( async (req, res, next)=>{


    const msg = {id: req.user.id, body:req.body }
    kafka.make_request("update_updateUserProfile", msg, function (error, user) {
  
     if(error){
         if(error.msg==="No user found"){
             return next(new ErrorResponse(`No user found `, 400));
         }
         
         res.status(500).json({
             success: false,
             msg: "Internal server error"
         });
         
             }else if(user){
                res.status(200).json({
                    success: true,
                    data: user
                });
             }

   });


    // let user;
    // user = await User.findById(req.user.id);

    // //check if user exists
    // if(!user){
    //     return next(new ErrorResponse(`No user exists with id ${req.user.id}`, 400));
    // }

    // user = await User.findByIdAndUpdate(req.user.id, req.body, {
    //     new: true,
    //     runValidators: true
    // });

    // res.status(200).json({
    //     success: true,
    //     data: user
    // });
});


//@desc     Update User profile image
//@route    PUT /api/v1/users/image
//@access   Private

exports.addImage = asyncHandler( async (req, res, next)=>{

    const msg = {body:req.body};
    kafka.make_request("post_addImage", msg, function (error, user) {
  
     if(error){
         if(error.msg==="No user found"){
             return next(new ErrorResponse(`No user found `, 400));
         }
         
         res.status(500).json({
             success: false,
             msg: "Internal server error"
         });
         
             }else if(user){
                res.status(200).json({
                    success: true,
                    data: user
                });
             }

   });



//    exports.addImage = asyncHandler( async (req, res, next)=>{
//     let user;
//     user = await User.findById(req.body.id);

//     //check if user exists
//     if(!user){
//         return next(new ErrorResponse(`No user exists with id ${req.body.id}`, 400));
//     }

//     user = await User.findByIdAndUpdate(req.body.id, {profileUrl:req.body.url}, {
//         new: true,
//         runValidators: true
//     });

//     res.status(200).json({
//         success: true,
//         data: user
//     });
// });












    // let user;
    // user = await User.findById(req.body.id);

    // //check if user exists
    // if(!user){
    //     return next(new ErrorResponse(`No user exists with id ${req.body.id}`, 400));
    // }

    // user = await User.findByIdAndUpdate(req.body.id, {profileUrl:req.body.url}, {
    //     new: true,
    //     runValidators: true
    // });

    // res.status(200).json({
    //     success: true,
    //     data: user
    // });
});
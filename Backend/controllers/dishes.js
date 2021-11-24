const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Dish = require("../models/Dish");
const asyncHandler = require('../middleware/async');

//@desc     Add a Dish
//@route    POST /api/v1/dishes/
//@access   Private
exports.addDish = asyncHandler(async (req, res, next)=>{
    let dish;
    //check if user is restaurant owner
    if(req.user.role!== 'restaurant'){
        return next(new ErrorResponse(`Only restaurant owners can add new dishes!`));
    }

    //check if dish with same name already exists
     dish = await Dish.find({name:req.body.name, restid: req.user.id});
    console.log("\\\\\\\\\\\\\\\\\\\\\dish\\\\\\\\\\\\\\",dish)
    //dont allow if dish exists
    if(dish.length>0){
        return next(new ErrorResponse(`The dish with name ${req.body.name} already exists! `, 400));
    }
    //add restaurant id to body
    req.body.restid = req.user.id;
    
     dish = await Dish.create(req.body);
    res.status(201).json({
        success: true,
        data: dish
    });
});


//@desc     Get all dishes of a restaurant
//@route    GET /api/v1/dishes/rest/:id
//@access   Private
exports.getDishesforARest = asyncHandler(async (req, res, next)=>{

    //get dishes for a restaurant
    const dishes = await Dish.find({restid: req.params.id})
   
    //check if there are any dishes
    if(!dishes){
        return next(new ErrorResponse(`No dishes found for restaurant with id ${req.params.id}`, 400));
    }
    
    res.status(200).json({
        success: true,
        data: dishes
    });
});


//@desc     Update a dish details
//@route    PUT /api/v1/dishes/:id
//@access   Private
exports.editDish = asyncHandler(async (req, res, next)=>{

    let dish = await Dish.findById(req.params.id);
    
    if(!dish){
        return next(new ErrorResponse(`Dish not found with id ${req.params.id}`, 404));
    }

    //make sure that user is restaurant owner
    //converting Object id to string
    if(dish.restid.toString() !== req.user.id || req.user.role !== 'restaurant'){
        return next(new ErrorResponse(`Only owner of this restaurant can change the dish details`, 401));
    }

    dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: dish
    });
});



//@desc     Update a dish image
//@route    PUT /api/v1/dishes/image/:id
//@access   Private
exports.updateDishImage = asyncHandler(async (req, res, next)=>{

    let dish = await Dish.findById(req.body.dishId);
    
    if(!dish){
        return next(new ErrorResponse(`Dish not found with id ${req.params.id}`, 404));
    }

    //make sure that user is restaurant owner
    //converting Object id to string
    // if(dish.restid.toString() !== req.user.id || req.user.role !== 'restaurant'){
    //     return next(new ErrorResponse(`Only owner of this restaurant can change the dish image`, 401));
    // }

    dish = await Dish.findByIdAndUpdate(req.body.dishId, {dishImageUrl:req.body.imageUrl}, {
        new:true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: dish
    });
});


//@desc     Get a dish by id
//@route    GET /api/v1/dishes/:id
//@access   Private
exports.getDish = asyncHandler(async (req, res, next)=>{

    //get dishes for a restaurant
    const dish = await Dish.find({_id: req.params.id})
   
    //check if there are any dishes
    if(!dish){
        return next(new ErrorResponse(`No dish found with id ${req.params.id}`, 400));
    }
    
    res.status(200).json({
        success: true,
        data: dish
    });
});
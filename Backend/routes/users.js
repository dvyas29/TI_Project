const express = require("express");
const passport = require("passport");
const router=express.Router();
const{ 
    getUserProfile,
    updateUserProfile,
    getUserProfileFromId,
    getUserProfileFromIdPost,
    addImage,
    getImage
} = require("../controllers/users");

router.route('/')
.get(passport.authenticate('jwt',{session:false}), getUserProfile)
.put(passport.authenticate('jwt',{session:false}), updateUserProfile)

router.route('/image')
.get(getImage)
.put(addImage)

router.route('/:id')
.get(passport.authenticate('jwt',{session:false}), getUserProfileFromId)
.post(passport.authenticate('jwt',{session:false}), getUserProfileFromIdPost)




module.exports = router;
const express = require("express");
const passport = require("passport");
const router = express.Router();


const {
    addDish,
    getDishesforARest,
    editDish,
    getDish,
    updateDishImage
} = require("../controllers/dishes");

router.route('/').post( passport.authenticate('jwt', {session: false}), addDish);

router.route('/image').put( updateDishImage)

router.route('/rest/:id')
.get(passport.authenticate('jwt', {session: false}), getDishesforARest)

router.route('/:id')
.put(passport.authenticate('jwt',{session: false}), editDish )
.get(passport.authenticate('jwt',{session: false}), getDish)

module.exports = router;
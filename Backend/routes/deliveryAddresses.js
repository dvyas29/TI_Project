const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    addDeliveryAddress,
    getDeliveryAddress

} = require("../controllers/deliveryAddresses");



router.route('/')
.post(passport.authenticate('jwt', {session: false}), addDeliveryAddress)


router.route('/:id').get(passport.authenticate('jwt', {session:false}), getDeliveryAddress)

module.exports = router;

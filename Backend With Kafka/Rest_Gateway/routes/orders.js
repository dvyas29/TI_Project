const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    addOrderDetails,
    getOrderDetails,
    updateOrderStatus,
    getAllOrdersRestaurant,
    getAllOrdersCustomer,
    filterOrderDetailsRest,
    filterOrderDetailsCust
} = require("../controllers/orders");



router.route('/')
.post(passport.authenticate('jwt', {session: false}), addOrderDetails)
.put(passport.authenticate('jwt', {session: false}), updateOrderStatus)

router.route('/:id').get(passport.authenticate('jwt', {session:false}), getOrderDetails)

router.route('/customer/:id').get(passport.authenticate('jwt', {session:false}), getAllOrdersCustomer)

router.route('/restaurant/:id').get(passport.authenticate('jwt', {session:false}), getAllOrdersRestaurant);

router.route('/filterCustomer').post(passport.authenticate('jwt', {session:false}), filterOrderDetailsCust);

router.route('/filterRestaurant').post(passport.authenticate('jwt', {session:false}), filterOrderDetailsRest);


module.exports = router;
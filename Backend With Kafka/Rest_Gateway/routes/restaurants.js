const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    getAllRest,
    filteredRests
} = require("../controllers/restaurants");


router.route('/')
.get(passport.authenticate('jwt', {session: false}), getAllRest)
.post(passport.authenticate('jwt', {session: false}),filteredRests)

module.exports = router;
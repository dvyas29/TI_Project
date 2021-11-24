const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    register,
    login,
    current
} = require("../controllers/auth");



router.route('/register').post( register);
router.route('/login').post( login);
router.route('/current').get(passport.authenticate('jwt', {session: false}), current);

module.exports = router;
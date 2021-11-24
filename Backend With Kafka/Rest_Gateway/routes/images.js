const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    register,
    login,
    current
} = require("../controllers/auth");



router.post('/register', register);
router.post('/login', login);
router.get('/current', passport.authenticate('jwt', {session: false}), current);


module.exports = router;
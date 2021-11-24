const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    addFavs,
    removeFavs,
    getFavs,
    getRestAsFav
} = require("../controllers/favorites");

router.route('/')
.post(passport.authenticate('jwt', {session: false}), addFavs)
.delete(passport.authenticate('jwt', {session: false}), removeFavs)

router.route('/:id')
.get(passport.authenticate('jwt', {session: false}), getFavs)

router.route('/:custid/:restid')
.get(passport.authenticate('jwt', {session: false}), getRestAsFav)

module.exports = router;
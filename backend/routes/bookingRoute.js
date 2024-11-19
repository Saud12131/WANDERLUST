const express = require('express');
const router = express.Router();
const { authentication } = require("../middelware/auth");
const { CreateBooking, Mybookings } = require('../controllers/bookingController');

router.route("/booklisting").post(authentication, CreateBooking);
router.route("/mybookings").get(authentication, Mybookings);
module.exports = router;
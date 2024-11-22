const express = require('express');
const router = express.Router();
const { authentication } = require("../middelware/auth");
const { CreateBooking, Mybookings } = require('../controllers/bookingController');
const validate = require("../middelware/validate");
const {  BookingValidation } = require("../validation/Validations");

router.route("/booklisting").post(authentication,validate(BookingValidation), CreateBooking);
router.route("/mybookings").get(authentication, Mybookings);
module.exports = router;
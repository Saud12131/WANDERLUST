const express = require('express');
const router = express.Router();
const { authentication } = require("../middelware/auth");
const { CreateBooking, Mybookings } = require('../controllers/bookingController');
const validate = require("../middelware/validate");
const { ListingValidation , BookingValidation ,UserValidation , PaymentValidation} = require("../validation/Validations");

router.route("/booklisting").post(authentication, CreateBooking);
router.route("/mybookings").get(authentication, Mybookings);
module.exports = router;
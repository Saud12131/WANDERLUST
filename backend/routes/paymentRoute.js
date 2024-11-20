const express = require("express");
const { CheckOut, PaymentVerification } = require('../controllers/paymentController');
const router = express.Router();
const { authentication } = require("../middelware/auth");
const validate = require("../middelware/validate");
const { ListingValidation , BookingValidation ,UserValidation , PaymentValidation} = require("../validation/Validations");

router.route("/checkout").post( authentication,CheckOut);//give it auth afterewards
router.route("/paymentverification").post(PaymentVerification);//give it auth afterewards

module.exports = router;
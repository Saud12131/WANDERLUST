const express = require("express");
const { Signup, Login } = require("../controllers/userController");
const router = express.Router();
const validate = require("../middelware/validate");
const { ListingValidation , BookingValidation ,UserLoginValidation , UserLogOutinValidation , PaymentValidation} = require("../validation/Validations");

router.route("/signup").post(Signup);
router.route("/login").post(Login);

module.exports = router;
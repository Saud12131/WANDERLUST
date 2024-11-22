const express = require("express");
const { Signup, Login } = require("../controllers/userController");
const router = express.Router();
const validate = require("../middelware/validate");
const { UserLoginValidation , NewUserValidation } = require("../validation/Validations");

router.route("/signup").post(validate(NewUserValidation),Signup);
router.route("/login").post(validate(UserLoginValidation),Login);

module.exports = router;
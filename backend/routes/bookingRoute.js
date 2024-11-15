const express = require('express');
const router = express.Router();
const { authentication } = require("../middelware/auth");
const { CreateBooking } = require('../controllers/bookingController');

router.route("/booklisting").post( authentication, CreateBooking);

module.exports = router;
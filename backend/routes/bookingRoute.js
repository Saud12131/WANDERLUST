import express from "express";
import { authentication } from "../middelware/auth.js"; 
import { CreateBooking, Mybookings } from "../controllers/bookingController.js"; 
import validate from "../middelware/validate.js"; 
import { BookingValidation } from "../validation/Validations.js"; 

const router = express.Router();

router.route("/booklisting").post(authentication,validate(BookingValidation), CreateBooking);
router.route("/mybookings").get(authentication, Mybookings);
export default router;
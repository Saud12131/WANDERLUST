import express from "express";
import { CheckOut, PaymentVerification } from "../controllers/paymentController.js"; // Add .js for ES modules
import { authentication } from "../middelware/auth.js"; // Add .js for ES modules
import validate from "../middelware/validate.js"; // Add .js for ES modules
import { PaymentValidation } from "../validation/Validations.js"; // Add .js for ES modules

const router = express.Router();

// Routes
router.route("/checkout").post(authentication, CheckOut); // Auth middleware applied
router
  .route("/paymentverification")
  .post(validate(PaymentValidation), PaymentVerification); // Validation middleware applied

export default router;

import express from "express";
import { Signup, Login } from "../controllers/userController.js"; // Add .js for ES modules
import validate from "../middelware/validate.js"; // Add .js for ES modules
import { UserLoginValidation, NewUserValidation } from "../validation/Validations.js"; // Add .js for ES modules

const router = express.Router();

// Routes
router.route("/signup").post(validate(NewUserValidation), Signup);
router.route("/login").post(validate(UserLoginValidation), Login);

export default router;

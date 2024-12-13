import express from "express";
import { Signup, Login , ForgotPassword, resetpassword} from "../controllers/userController.js";
import validate from "../middelware/validate.js";
import { UserLoginValidation, NewUserValidation } from "../validation/Validations.js"; 
const router = express.Router();

// Routes
router.route("/signup").post(validate(NewUserValidation), Signup);
router.route("/login").post(validate(UserLoginValidation), Login);
router.route("/forgot-password").post( ForgotPassword);
router.route("/reset-password/:id/:token").post( resetpassword);

export default router;

import User from '../models/usermodel.js';
import jwt, { decode } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs"
const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "Please enter all required fields." });
  }

  try {
    const user = await User.create({ username, email, password });
    if (user) {
    
      return res.status(201).json({ success: true, message: "User added successfully" });
    } else {
      throw new Error("Unable to register user");
    }
  } catch (err) {
   
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please enter all required fields." });
  }

  try {

    const user = await User.findOne({ email });

    if (user && (await user.matchpassword(password))) {

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: `${email} this user not found`
      });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset your Wanderlust password',
      text: `Please reset your password by clicking the following link: http://localhost:5173/reset-password/${user._id}/${token}`
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({
          success: false,
          message: "Failed to send email"
        });
      } else {
        return res.json({
          success: true,
          message: "Email sent successfully"
        });
      }
    });
  } catch (error) {

    return res.json({
      success: false,
      message: "An error occurred while processing the request"
    });
  }
}
const resetpassword = async (req, res) => {
  const { id, token } = req.params;
  const {password} = req.body;
  jwt.verify(token, "heyysaud", (err, decode) => {
    if (err) {
      return res.json({
        success: false,
        message: "error with token"
      });
    } else {
      bcrypt.hash(password, 10)
        .then(hash => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then(u => res.json({
              success: true,
              message: "password changed successfully"
            }))
            .catch(err=>res.json({
              success: false,
              message: "error",err
            }))
        })
    }
  })
}


export { Signup, Login, ForgotPassword, resetpassword };

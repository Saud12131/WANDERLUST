const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "Please enter all required fields." });
  }

  try {
   
    const user = await User.create({ username, email, password });

    if (user) {
      console.log("User added successfully:", user);
      return res.status(201).json({ success: true, message: "User added successfully" });
    } else {
      throw new Error("Unable to register user");
    }
  } catch (err) {
    console.error("Error during signup:", err);
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
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

module.exports = { Signup, Login };

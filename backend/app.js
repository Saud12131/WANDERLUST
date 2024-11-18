const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const server = http.createServer(app);
const connectDB = require("./config/connectdb");
const UserRoute = require('../backend/routes/userroutes');
const listingRoute = require("../backend/routes/listingRoutes");
const BookingRoute = require("./routes/bookingRoute");
const PaymentRoute = require('./routes/paymentRoute');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
}));

server.listen(process.env.PORT, () => {
  console.log(`server listing to port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("server working");
});

app.get("/api/key", (req, res) => res.status(200).json({ key: process.env.RAZORPAY_KEY_ID }));

app.use("/api/user", UserRoute);
app.use("/api/listings", listingRoute);
app.use("/api/bookings", BookingRoute);
app.use("/api/payment", PaymentRoute);


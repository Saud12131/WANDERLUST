import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectdb.js";
import UserRoute from "../backend/routes/userroutes.js";
import listingRoute from "../backend/routes/listingRoutes.js";
import BookingRoute from "./routes/bookingRoute.js";
import PaymentRoute from "./routes/paymentRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
connectDB();

const allowedOrigins = [
  'http://localhost:5173', // Development environment
  'https://wanderlust-myk8.vercel.app', // Deployed frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("server working");
});

app.get("/api/key", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
);

app.use("/api/user", UserRoute);
app.use("/api/listings", listingRoute);
app.use("/api/bookings", BookingRoute);
app.use("/api/payment", PaymentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
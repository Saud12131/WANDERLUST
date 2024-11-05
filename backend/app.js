const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const server = http.createServer(app);
const connectDB = require("./config/connectdb");
const UserRoute = require('../backend/routes/userroutes');
const listingRoute = require("../backend/routes/listingRoutes");
const cors = require('cors');
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
app.use("/api/user", UserRoute);
app.use("/api/listings", listingRoute);
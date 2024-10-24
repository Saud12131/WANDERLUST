const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const server = http.createServer(app);
const connectDB = require("./config/connectdb");
const UserRoute = require('../backend/routes/userroutes');
const TaskRoute = require('../backend/routes/taskRoute');
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
server.listen(process.env.PORT, () => {
    console.log(`server listing to port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
    res.send("server working");
});
app.use("/api/user", UserRoute);
app.use("/api/task", TaskRoute);

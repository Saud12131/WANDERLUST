const mongoose = require("mongoose");
const express = require('express');
const User = require('../models/usermodel');
const Task = require('../models/taskmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Signup = async (req, res) => {

    const { username, email, password } = req.body;
    //all fields not enterd
    if (!username, !email, !password) {
        res.status(400).send("enter all the fiels");
    }
    //new user
    let user = await User.create({
        username,
        email,
        password,
    });
    try {
        if (user) {
            res.send("user added sucessfully");
            console.log(user);
        } else {
            console.log("unable to reguster user");
        }
    } catch (err) {
        res.send(err);
    }
}

const Login = async (req, res) => {

    let { email, password } = req.body;
    if (!email || !password) {
        res.send("please enter all the fields");
        console.log("please enter all the fields");
    }

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchpassword(password))) {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
            res.send(`loggedin successfully ${token}`);
        
        } else {
            res.send("invalid details field you fellow dev?/")
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || err,
        });
    }

}
module.exports = { Signup, Login };
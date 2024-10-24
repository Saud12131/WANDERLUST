const mongoose = require("mongoose");
const express = require('express');
const User = require('../models/usermodel');
const Task = require('../models/taskmodel');
const { all } = require("../routes/userroutes");

const newtask = async (req, res) => {
    let { newTask, isDone } = req.body;
    try {
        if (!newTask) {
            return res.status(400).json({ 
                success: false,
                message: "Please enter a task",
            });
        }

        let task = await Task.create({
            newTask,
            isDone,
        });

        if (task) {
            return res.json({
                success: true,
                message: "Task added successfully"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const alltask = async (req, res) => {

}
module.exports = { newtask, alltask };
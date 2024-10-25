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
            user: req.user,
        });

        if (task) {
            return res.json({
                success: true,
                message: "Task added successfully",
                task,
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
    try {
        const tasks = await Task.find({ user: req.user });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
}

const DeleteTask = async (req, res) => {
   
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    
        if (!task) {
          return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
        }
    
        return res.status(200).json({ success: true, message: "Task deleted successfully" });
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
}
module.exports = { newtask, alltask, DeleteTask };

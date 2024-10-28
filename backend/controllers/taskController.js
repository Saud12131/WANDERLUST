const Task = require('../models/taskmodel');

// Add a new task
const newTask = async (req, res) => {
    const { newTask, isDone } = req.body;

    if (!newTask) {
        return res.status(400).json({
            success: false,
            message: "Please enter a task description.",
        });
    }

    try {
        const task = await Task.create({
            newTask,
            isDone,
            user: req.user, 
        });

        return res.status(201).json({
            success: true,
            message: "Task added successfully.",
            task,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to add task. Please try again.",
            error: err.message,
        });
    }
};

// fetch all tasks for a user
const allTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });

        return res.status(200).json({
            success: true,
            tasks,
        });
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks. Please try again.",
            error: err.message,
        });
    }
};

// Delete a specific task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete task. Please try again.",
            error: err.message,
        });
    }
};

module.exports = { newTask, allTasks, deleteTask };

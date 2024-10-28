const express = require("express");
const { newTask, allTasks, deleteTask } = require("../controllers/taskController");
const router = express.Router();
const {authentication} = require('../middelware/auth');
router.route("/addtask").post(authentication,newTask);
router.route("/alltask").get(authentication,allTasks);
router.route("/deletetask/:id").delete(authentication,deleteTask);

module.exports = router;
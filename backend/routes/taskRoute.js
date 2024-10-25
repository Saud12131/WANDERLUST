const express = require("express");
const { newtask, alltask, DeleteTask } = require("../controllers/taskController");
const router = express.Router();
const {authentication} = require('../middelware/auth');
router.route("/addtask").post(authentication,newtask);
router.route("/alltask").get(authentication,alltask);
router.route("/deletetask/:id").delete(authentication,DeleteTask);

module.exports = router;
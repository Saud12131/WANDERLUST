const express = require("express");
const { newtask, alltask } = require("../controllers/taskController");
const router = express.Router();
const {authentication} = require('../middelware/auth');
router.route("/addtask").post(authentication,newtask);
router.route("/alltask").get(authentication,alltask);

module.exports = router;
const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    newTask: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

   

});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
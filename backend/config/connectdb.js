const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://saudsayyed59:ocVLcEWliIysYxM5@todo-app.ogepf.mongodb.net/?retryWrites=true&w=majority&appName=TODO-APP");
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

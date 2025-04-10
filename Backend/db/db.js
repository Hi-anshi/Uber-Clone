const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        console.log('MongoDB URI:', process.env.MONGODB_URI);
        process.exit(1); // Exit the process if the connection fails
    });
}

module.exports = connectDB;
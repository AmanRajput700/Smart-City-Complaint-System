const mongoose = require('mongoose');
require('dotenv').config();
const connectDB =  () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
}
 
module.exports = connectDB;
const mongoose = require('mongoose');
const connectDB =  () => {
    try {
        mongoose.connect('mongodb://localhost:27017/mydatabase')
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
}
 
module.exports = connectDB;
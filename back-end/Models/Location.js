const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
         type: String, required: true 
    }, 
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    }
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
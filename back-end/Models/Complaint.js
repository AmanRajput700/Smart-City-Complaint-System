const mongoose = require('mongoose');
const { Schema } = mongoose;

const complaintSchema = new Schema({
    title: {
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String 
    },
    status: {
        type: String,
        enum: ['Pending','Admin Accepted', 'In Progress', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    location: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location' 
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    strikes: { type: Number, default: 0 },
    upvoteCount: { type: Number, default: 0 },
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
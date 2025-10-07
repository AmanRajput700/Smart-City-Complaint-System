import mongoose from 'mongoose';

const commentSchema = new Schema({
    text: {
        type: String,
        required: true 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    complaint: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Complaint', 
        required: true 
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
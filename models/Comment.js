const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Links to the Post model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links to the User model
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    replies: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            commentText: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Auto-update `updatedAt` when a comment is modified
commentSchema.pre('save', function (next) {
    if (this.isModified('commentText')) {
        this.updatedAt = Date.now();
    }
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

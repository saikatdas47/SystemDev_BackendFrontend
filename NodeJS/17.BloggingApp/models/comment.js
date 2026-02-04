const mongose = require('mongoose');
const Schema = mongose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, 
{
    timestamps: true
});

const Comment = mongose.model('comment', CommentSchema);

module.exports = Comment;
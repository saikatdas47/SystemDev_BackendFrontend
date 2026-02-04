const mongose = require('mongoose');
const Schema = mongose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
    imgUrl: {
        type: String
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

const Blog = mongose.model('blog', BlogSchema);

module.exports = Blog;
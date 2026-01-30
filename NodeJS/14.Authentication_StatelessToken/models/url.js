const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }

}, {
    timestamps: true,
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;


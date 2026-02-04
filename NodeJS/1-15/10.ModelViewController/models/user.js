const mongoose = require('mongoose');

//Schema definition
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String }
},
 {
        timestamps: true
    });
//schema banano shes akhon schema theke model banabo
const User = mongoose.model('user', userSchema); //aikhane 'user' holo collection name jeta mongodb te create hobe , collection holo jekhane document gula store thakbe , document holo record

module.exports = User;
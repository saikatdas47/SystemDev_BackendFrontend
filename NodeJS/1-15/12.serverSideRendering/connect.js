const mongoose = require('mongoose');
mongoose.set('strictQuery', true); //to suppress deprecation warning

async function connectToMongoDB(dbURL) {
    try {
        return mongoose.connect(dbURL);
    } catch (err) {
        return console.log("Error connecting to MongoDB : ", err);
    }
}

module.exports = {connectToMongoDB};
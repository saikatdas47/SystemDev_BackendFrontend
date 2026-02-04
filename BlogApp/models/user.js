const mongose = require('mongoose');
const Schema = mongose.Schema;
const { createHmac, randomBytes } = require('crypto');
const { generateToken } = require('../services/authentication');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profilePicUrl: {
        type: String,
        default: '/images/userAvatar.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
},
    {
        timestamps: true
    });


UserSchema.pre('save', function () {
    if (!this.isModified('password')) return;

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(this.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
});

UserSchema.static("matchedPasswordANDGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const givenpasswordHash = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

    if (!user.password || user.password !== givenpasswordHash) {
        throw new Error('Invalid password');
    }
    else {
        //console.log('User authenticated:', user);
        const token = generateToken(user);
        return token;
    }

});

const User = mongose.model('user', UserSchema);
module.exports = User;
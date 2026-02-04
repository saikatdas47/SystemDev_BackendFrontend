const jwt = require('jsonwebtoken');

const SECRET_KEY = 'BlogAppSecretKey';

function generateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicUrl: user.profilePicUrl,
        role: user.role
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' });
    return token;
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Invalid token');
    }
}

module.exports = { 
    generateToken, 
    verifyToken 
};
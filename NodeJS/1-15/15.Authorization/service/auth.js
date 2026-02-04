const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'moon123star';

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2d' });
}

function getUser(token) {
    try {
        if (!token) return null;
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null; // invalid or expired token
    }
}

module.exports = {
    setUser,
    getUser
};

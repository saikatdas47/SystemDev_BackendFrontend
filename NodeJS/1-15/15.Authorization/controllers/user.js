const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });

    return res.redirect('/login');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = setUser(user);
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/');
    
}

function handleUserLogout(req, res) {
    res.clearCookie('token');
    return res.redirect('/login');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
};
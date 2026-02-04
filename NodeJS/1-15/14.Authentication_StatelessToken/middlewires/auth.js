const { getUser } = require('../service/auth');

function restrictToLoggedInUsersOnly(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect('/login');
    }

    const user = getUser(token);
    if (!user) {
        res.clearCookie('token'); // invalid token → clear cookie
        return res.redirect('/login');
    }

    req.user = user; // protected routes এ পাওয়া যাবে
    next();
}

function checkAuthenticationStatus(req, res, next) {
    const token = req.cookies?.token;

    if (token) {
        const user = getUser(token);
        if (user) {
            req.user = user;
        }
    }

    next();
}

module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuthenticationStatus
};
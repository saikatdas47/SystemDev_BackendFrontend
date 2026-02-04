const { verifyToken } = require('../services/authentication');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const token = req.cookies?.[cookieName];

        if (!token) {
            req.user = null;
            return next();   // stop here
        }

        try {
            const userPayLoad = verifyToken(token);
           // console.log('Authenticated user:', userPayLoad);
            req.user = userPayLoad;

        } catch (err) {
            console.log('Authentication error:', err.message);
            req.user = null;
        }

        next(); // called exactly once
    };
}

module.exports = { checkForAuthenticationCookie };
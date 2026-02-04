const { getUser } = require('../service/auth');

async function restrictToLoggedInUsersOnly(req, res, next) {
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) {
       // return res.status(401).json({ message: 'Unauthorized: No session ID' });
       return res.redirect('/login');
    }

    const user = getUser(sessionId);
    if (!user) {
       // return res.status(401).json({ message: 'Unauthorized: Invalid session' });
        return res.redirect('/login');
    }

    req.user = user; // next er pore function or route e user ta pabo req.user hishebe ata req korse middleware kore req kora jai aivabe . req sdudu server theke asbe amon na
    next();
}
async function checkAuthenticationStatus(req, res, next) {
    const sessionId = req.cookies?.sessionId;
    if (sessionId) {
        const user = getUser(sessionId);
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
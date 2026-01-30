const fs = require('fs');


function logReqRes(filename) {
    return (req, res, next) => {
        try {
            fs.appendFileSync(
                filename,
                `Request: ${req.method} ${req.url} - ${new Date().toISOString()}\n`
            );
        } catch (err) {
            console.error("Error writing to log file:", err);
        }
        next(); // ← REQUIRED
    };
}

module.exports = {
    logReqRes,
};
// Authentication Middleware

function isAuthenticated(req, res, next) {
    if (req.session && req.session.adminId) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized. Please log in.' });
    return;
}

function isNotAuthenticated(req, res, next) {
    if (req.session && req.session.adminId) {
        return res.status(400).json({ error: 'Already logged in' });
    }
    next();
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated
};

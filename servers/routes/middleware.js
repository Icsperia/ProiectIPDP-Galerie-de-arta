// middleware.js
const jwt = require('jsonwebtoken');

// Render pentru formularul de înregistrare
function renderRegister(res, data = {}) {
    res.render('register', {
        unError: null,
        emError: null,
        passError: null,
        passMatchError: null,
        error: null,
        ...data
    });
}

// Middleware: validare înregistrare
function validateRegister(req, res, next) {
    const errors = {};

    if (!req.body.user_name || req.body.user_name.length < 3) {
        errors.unError = 'Username must be at least 3 characters long';
    }

    if (!req.body.password || req.body.password.length < 6) {
        errors.passError = 'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length) {
        return renderRegister(res, errors);
    }

    next();
}

// Middleware: autentificare pe bază de cookie JWT
function isAuthenticated(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, 'SECRETKEY');
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}

// Middleware: autentificare API cu token în header
function apiAuthMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        req.user = jwt.verify(token, 'SECRETKEY');
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

// Middleware: similar cu cel de sus, dar returnează plain text
function krakendAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send("Not authenticated (no Authorization header)");
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, 'SECRETKEY');
        next();
    } catch (e) {
        console.error("Failed to verify JWT:", e.message);
        return res.status(403).send("Invalid token");
    }
}

// ✅ Export corect
module.exports = {
    renderRegister,
    validateRegister,
    isAuthenticated,
    apiAuthMiddleware,
    krakendAuth
};

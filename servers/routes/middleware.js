// middleware.js
const jwt = require('jsonwebtoken');

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
    



const middleware = {
    validateRegister: (req, res, next) => {
        const errors = {};

        if (!req.body.user_name || req.body.user_name.length < 3) {
            errors.unError = 'Username must be at least 3 characters long';
        }

        if (!req.body.password || req.body.password.length < 6) {
            errors.passError = 'Password must be at least 6 characters long';
        }

        // Dacă există erori de validare → reafișăm formularul cu mesajele potrivite
        if (Object.keys(errors).length) {
            return renderRegister(res, errors);
        }
        next();
    },

    isAuthenticated: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.redirect('/login');
        try {
            req.user = jwt.verify(token, 'SECRETKEY');
            next();
        } catch (err) {
            res.clearCookie('token');
            return res.redirect('/login');
        }
    },

    apiAuthMiddleware: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
        if (!token) return res.status(401).json({ message: 'No token provided' });
        try {
            req.user = jwt.verify(token, 'SECRETKEY');
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
};
middleware.renderRegister = renderRegister;
module.exports = middleware;
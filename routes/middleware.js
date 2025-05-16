// middleware.js
const jwt = require('jsonwebtoken');

const middleware = {
    validateRegister: (req, res, next) => {
        let errors = {};

        if (!req.body.user_name || req.body.user_name.length < 3) {
            errors.unError = 'Username must be at least 3 characters long';
        }


        if (!req.body.password || req.body.password.length < 6) {
            errors.passError = 'Password must be at least 6 characters long';
        }


        if (Object.keys(errors).length > 0) {
            return res.render('register', {
                unError: errors.unError,
                passError: errors.passError,
                passMatchError: errors.passMatchError
            });
        }


        next();
    },


    isAuthenticated: (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            console.log('Token not found');
            return res.redirect('/login');
        }

        try {
            const decoded = jwt.verify(token, 'SECRETKEY');
            console.log('Decoded JWT:', decoded);
            req.user = decoded;
            next();
        } catch (err) {
            console.log('Token invalid sau expirat:', err.message);
            res.clearCookie('token');
            return res.redirect('/login');
        }
    },



apiAuthMiddleware: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        req.user = jwt.verify(token, 'SECRETKEY');
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
};
module.exports = middleware;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { renderRegister, validateRegister } = require('./middleware');
const { User } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();


router.get('/register', (req, res) => {
    renderRegister(res);
});


router.post('/register', validateRegister, async (req, res) => {
    const { user_name, email, password, first_name, last_name } = req.body;
    try {
        if (await User.findOne({ where: { user_name } })) {
            return renderRegister(res, { unError: 'Username already exists' });
        }
        if (await User.findOne({ where: { email } })) {
            return renderRegister(res, { emError: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ user_name, email, password: hashedPassword, first_name, last_name, registered: new Date() });

        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        return renderRegister(res, { error: 'Registration failed' });
    }
});


router.get('/login', (req, res) => {
    res.render('login', { error: null });
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [{ user_name: username }, { email: username }]
            }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            if (req.headers.accept.includes('application/json')) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            return res.render('login', { error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user.id, user_name: user.user_name },
            'SECRETKEY',
            { expiresIn: '7d' }
        );

        user.last_login = new Date();
        await user.save();

        // Dacă vine dintr-un fetch()
        if (req.headers.accept.includes('application/json')) {
            return res.json({ token });
        }

        // Dacă e form HTML normal (fallback)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });

        // Trimite pagina HTML (nu va funcționa pentru Krakend)
        return res.render('after_login', { token }); // Asta trebuie completată cu JS (vezi mai jos)

    } catch (err) {
        console.error('Login error:', err.message);
        return res.status(500).send('Login failed');
    }
});



router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;

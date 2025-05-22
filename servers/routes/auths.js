const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { renderRegister, validateRegister } = require('./middleware');
const { User } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// REGISTER GET
router.get('/register', (req, res) => {
    renderRegister(res);
});

// REGISTER POST
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

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        return renderRegister(res, { error: 'Registration failed' });
    }
});

// LOGIN GET
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// LOGIN POST
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { [Op.or]: [{ user_name: req.body.username }, { email: req.body.username }] }
        });

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user.id, user_name: user.user_name },
            'SECRETKEY',
            { expiresIn: '7d' }
        );


        user.last_login = new Date();
        await user.save();

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // 🔁 în producție setează pe true
            maxAge: 3600000
        });
        res.render('after_login', { token }); // trimite JWT-ul către client

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).send('Login failed');
    }
});

// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;

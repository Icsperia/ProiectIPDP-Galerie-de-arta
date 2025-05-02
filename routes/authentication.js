// routes/router.js

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../DatabaseConnection');
const userMiddleware = require('./middleware');

// routes/router.js

router.post('/register', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
        'SELECT id_user FROM user WHERE LOWER(user_name) = LOWER(?)',
        [req.body.username],
        (err, result) => {
            if (result && result.length) {
                // error
                return res.status(409).send({
                    message: 'This username is already in use!',
                });
            } else {
                // username not in use
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            message: err,
                        });
                    } else {
                        db.query(
                            'INSERT INTO user (id_user, user_name, password, registered) VALUES (?, ?, ?, now());',
                            [uuid.v4(), req.body.username, hash],
                            (err, result) => {
                                if (err) {
                                    const error = "Eroare la inserarea în baza de date!";
                                    return res.redirect('/login?error=' + encodeURIComponent(error));
                                    }

                                return res.redirect('/');

                            }
                        );
                    }
                });
            }
        }
    );
});
// routes/router.js


router.post('/login', (req, res, next) => {
    db.query(
        `SELECT * FROM user WHERE user_name = ?;`,
        [req.body.username],
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: err,
                });
            }
            if (!result.length) {
                return res.status(400).send({
                    message: 'Username or password incorrect!',
                });
            }

            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    if (bErr) {
                        return res.status(400).send({
                            message: 'Username or password incorrect!',
                        });
                    }
                    if (bResult) {
                        // password match
                        const token = jwt.sign(
                            {
                                user_name: result[0].user_name,
                                userId: result[0].id,
                            },
                            'SECRETKEY',
                            { expiresIn: '7d' }
                        );
                        db.query(`UPDATE user SET last_login = now() WHERE id_user = ?;`, [
                            result[0].id,
                        ]);

                        // Redirect to the index page after successful login
                        return res.redirect('/');  // Redirect to the homepage (index)

                    }

                    // Redirect with error message
                    return res.redirect('/login?error=' + encodeURIComponent('Username or password incorrect!'));
                }
            );
        }
    );
});

router.get('/login', (req, res) => {
    const error = req.query.error || null;
    res.render('login', { error });
});

router.get('/register', (req, res) => {
    const error = req.query.error || null;
    res.render('register', { error });
});
router.get('/secret-route', (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../DatabaseConnection');
const session = require("express-session");
const body_parser = require('body-parser');


router.use(body_parser.urlencoded({ extended : false }));
router.use(body_parser.json());
router.use(session({
    secret : '1234567890abcdefghijklmnopqrstuvwxyz',
    resave : false,
    saveUninitialized : true,
    cookie : { secure : false }
}));

router.get('/products', (req, res) => {
    db.query('SELECT * FROM art', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rute pentru a adăuga produse în cart
router.post('/add-to-cart', (req, res) => {
    const productId = req.body.productId;

    if (!req.session.cart) {
        req.session.cart = [];
    }


    db.query('SELECT * FROM art WHERE id_art = ?', [productId], (err, results) => {
        if (err) throw err;
        const product = results[0];
        req.session.cart.push(product);

        res.send('Product added to cart');
    });
});



module.exports = router;
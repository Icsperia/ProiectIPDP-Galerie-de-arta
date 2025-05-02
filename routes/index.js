const express = require('express');
const router = express.Router();
const db = require('../DatabaseConnection');
const path = require("path");



router.get('/', (req, res) => {
    res.render('index', { title: 'Acasă' });
});

router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'Despre noi' });

});

router.get('/acrylic', (req, res) => {
    db.query('SELECT id_art, descriere, pret, locatie FROM acrylic_paintings', (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }
        res.render('acrylic', { title: 'Picturi Acrilice', lucrari: result });
    });
});


router.get('/watercolor', (req, res) => {



    res.render('pages/watercolor', { title: 'Picturi in Apa' });
});

router.get('/ai_art', (req, res) => {
    res.render('pages/ai_art', { title: 'Arta ai(daca poti sa o numesti arta)' });
});
router.get('/art', (req, res) => {
    res.render('pages/art', { title: 'Arta' });
});

router.get('/artists', (req, res) => {
    res.render('pages/artists', { title: 'Artisti' });
});
router.get('/bia', (req, res) => {
    res.render('pages/bia', { title: 'Bia' });
});
router.get('/draw', (req, res) => {
    res.render('pages/draw', { title: 'Desene' });
});
router.get('/georgi', (req, res) => {
    res.render('pages/georgi', { title: 'georgi' });
});

router.get('/portraits', (req, res) => {
    res.render('pages/portraits', { title: 'Portrete' });
});
router.get('/random_draw', (req, res) => {
    res.render('pages/random_draw', { title: 'Desene aleatoare' });
});

router.get('/reacts', (req, res) => {
    res.render('pages/reacts', { title: 'Reactii' });
});

router.get('/marian', (req, res) => {
    res.render('pages/reacts', { title: 'Reactii' });
});


module.exports = router;

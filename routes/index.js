const express = require('express');
const router = express.Router();
const db = require('../DatabaseConnection');

const {isAuthenticated} = require("./middleware");



router.get('/', (req, res) => {
    const error = req.query.error || null;
    res.render('login', { error });
});
router.get('/about', isAuthenticated, (req, res) => {
    console.log(req.user); // Verifică dacă req.user există
    if (!req.user) {
        return res.redirect('/login');  // Redirecționează dacă utilizatorul nu este autentificat
    }
    res.render('about', { user: req.user.user_name });
});
router.get('/acrylic',isAuthenticated, (req, res) => {
    db.query("SELECT id_art, descriere, pret, locatie FROM  art WHERE categorie = 'acrylic' ", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }
        res.render('acrylic', { title: 'Picturi Acrilice', lucrari: result });
    });
});


router.get('/watercolor', (req, res) => {
    db.query("SELECT id_art, descriere, pret, locatie FROM art WHERE categorie = 'watercolor' ", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }
        res.render('watercolor', { title: 'Picturi in Apa' , lucrari: result });
    });
});


router.get('/ai_art', (req, res) => {
    res.render('ai_art', { title: 'Arta ai(daca poti sa o numesti arta)' });
});
router.get('/art', (req, res) => {
    res.render('art', { title: 'Arta' });
});

router.get('/artists', (req, res) => {
    res.render('artists', { title: 'Artisti' });
});
router.get('/bia', (req, res) => {
    res.render('bia', { title: 'Bia' });
});
router.get('/draw', (req, res) => {
    res.render('draw', { title: 'Desene' });
});
router.get('/georgi', (req, res) => {
    res.render('georgi', { title: 'georgi' });
});

router.get('/portraits', (req, res) => {
    res.render('portraits', { title: 'Portrete' });
});
router.get('/random_draw', (req, res) => {
    res.render('random_draw', { title: 'Desene aleatoare' });
});

router.get('/reacts', (req, res) => {
    res.render('reacts', { title: 'Reactii' });
});

router.get('/marian', (req, res) => {
    res.render('reacts', { title: 'Reactii' });
});


module.exports = router;

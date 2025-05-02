const express = require('express');
const path = require('path');
const db = require('../DatabaseConnection');

const router = express.Router();

router.get('/images', (req, res) => {
    const id = req.query.id;

    db.query(
        'SELECT locatie FROM acrylic_paintings WHERE id_acrylic_paintings = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).send('Error fetching image');
            }

            if (!results || results.length === 0) {
                return res.status(404).send('Image not found');
            }

            const imagePath = results[0].locatie;
            const fullImagePath = path.join(__dirname, '..', 'src', 'images', imagePath);

            res.sendFile(fullImagePath, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).send('Error sending image');
                }
            });
        }
    );
});

router.get('/', (req, res) => {
    db.query('SELECT id_art, descriere, pret FROM acrylic_paintings', (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        if (!result || result.length === 0) {
            return res.status(404).send('Nu există înregistrări în tabelă');
        }

        console.log('Rezultate din DB:', result);
        res.render('pages/acrylic', { lucrari: result });
    });
});
    module.exports = router;

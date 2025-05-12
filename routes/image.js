const express = require('express');
const path = require('path');
const db = require('../DatabaseConnection');
const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const fs = require('fs');

require('dotenv').config();

// Get acrylic images
router.get('/acrylic', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'acrylic'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('acrylic', { lucrari, user: req.session.user });
    });
});

// Get portraits images
router.get('/portraits', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'portraits'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('portraits', { lucrari, user: req.session.user });
    });

});

// Get watercolor images
router.get('/watercolor', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'portraits'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('Watercolor', { lucrari, user: req.session.user });
    });
});

// Get random draw images
router.get('/random_draw', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'random_draw'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('Random draw', { lucrari, user: req.session.user });
    });
});

// Get draw images (dreses)
router.get('/dress', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'dress'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('Dress', { lucrari, user: req.session.user });
    });
});

// generated images
router.post('/api/generate-variation', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        const form = new FormData();
        form.append('image', fs.createReadStream(imagePath));
        form.append('n', 1);
        form.append('size', '1024x1024');

        const response = await axios.post('https://api.openai.com/v1/images/variations', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        fs.unlinkSync(imagePath);

        const imageUrl = response.data.data[0].url;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Eroare la generarea imaginii:', error.response?.data || error.message);
        res.status(500).json({ error: 'Eroare la generarea variației imaginii.' });
    }
});

module.exports = router;
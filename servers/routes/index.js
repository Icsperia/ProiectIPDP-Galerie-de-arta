const express = require('express');
const { isAuthenticated } = require('./middleware');
const { Art, Cart } = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
    const error = req.query.error || null;
    res.render('welcome', { error });
});

router.get('/about', isAuthenticated, (req, res) => {
    res.render('about', {
        user: req.user.user_name,
        session: req.session
    });
});

async function renderArtByCategory(req, res, category, viewName, title) {
    try {
        console.log("Categorie cerută:", category);
        console.log("User autentificat:", req.user);

        const result = await Art.findAll({ where: { categorie: category } });

        console.log("Rezultat DB:", result);

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.art_description || '',
            pret: row.price,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render(viewName, {
            title,
            lucrari,
            user: req.user.user_name,
            session: req.session
        });
    } catch (err) {
        console.error(` Eroare la interogarea pentru ${category}:`, err.message);
        console.error(err.stack);
        res.status(500).send('Eroare la interogarea bazei de date');
    }
}

// Categorii de artă
router.get('/acrylic', isAuthenticated, (req, res) => renderArtByCategory(req, res, 'acrylic', 'acrylic', 'Picturi Acrilice'));
router.get('/watercolor', isAuthenticated, (req, res) => renderArtByCategory(req, res, 'watercolor', 'watercolor', 'Watercolor'));
router.get('/portraits', isAuthenticated, (req, res) => renderArtByCategory(req, res, 'portraits', 'portraits', 'Pencil Portraits'));
router.get('/dress', isAuthenticated, (req, res) => renderArtByCategory(req, res, 'dress', 'dress', 'Dress'));
router.get('/random_draw', isAuthenticated, (req, res) => renderArtByCategory(req, res, 'random_draw', 'random_draw', 'Random Draw'));
router.get('/reacts', isAuthenticated, (req, res) => renderArtByCategory(req, res, 'reacts', 'reacts', 'Reacts'));
router.get('/welcome' , (req, res)=>{

    res.render('welcome')

})


router.get('/ai_art', isAuthenticated, (req, res) => {
    res.render('ai_art', {
        title: 'AI art',
        user: req.user.user_name,
        session: req.session
    });
});

router.get('/art', isAuthenticated, (req, res) => {
    res.render('art', {
        title: 'Arta',
        user: req.user.user_name,
        session: req.session
    });
});

router.get('/artists', isAuthenticated, (req, res) => {
    res.render('artists', {
        title: 'Artist',
        user: req.user.user_name,
        session: req.session
    });
});


router.get('/bia', isAuthenticated, (req, res) => {
    res.render('bia', {
        title: 'About Bianca Husu',
        artist: {
            name: 'Bianca Husu',
            bio: '....',
            profileImage: '/images/artist/bia.jpg'
        },
        user: req.user.user_name,
        session: req.session
    });
});

router.get('/georgi', isAuthenticated, (req, res) => {
    res.render('georgi', {
        title: 'About Georgiana Sanda',
        artist: {
            name: 'Georgiana Sanda',
            bio: '....',
            profileImage: '/images/artist/georgi.jpg'
        },
        user: req.user.user_name,
        session: req.session
    });
});

router.get('/marian', isAuthenticated, (req, res) => {
    res.render('marian', {
        title: 'About Marian Girbacea',
        artist: {
            name: 'Marian Girbacea',
            bio: '.....',
            profileImage: '/images/artist/marian.jpg'
        },
        user: req.user.user_name,
        session: req.session
    });
});
/*
router.get('/cart', isAuthenticated, async (req, res) => {
    try {
        const id_user = req.user.id;

        const cartItems = await Cart.findAll({
            where: { id_user },
            include: [{
                model: Art,
                as: 'art',
                attributes: ['id_art', 'art_name', 'art_description', 'price', 'art_images']
            }]
        });

        const items = cartItems.map(item => {
            const art = item.art;
            return {
                id_art: art?.id_art,
                art_name: art?.art_name || 'Artă indisponibilă',
                descriere: art?.art_description || '',
                pret: !isNaN(Number(art?.price)) ? Number(art.price) : 0,
                imagini: art?.art_images?.split(',').map(s => s.trim()) || [],
                quantity: item.quantity
            };
        });

        const transportCost = 20;

        res.render('cart', {
            cartItems: items,
            success: req.query.success === '1',
            transportCost,
            user: req.user.user_name,
            session: req.session
        });
    } catch (err) {
        console.error('Error loading cart:', err);
        res.status(500).send('Eroare la afișarea coșului.');
    }
});
*/
module.exports = router;

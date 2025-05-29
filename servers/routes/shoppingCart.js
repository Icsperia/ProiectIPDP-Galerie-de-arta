const express = require('express');
const { isAuthenticated, krakendAuth} = require('./middleware');
const { Cart, Order, Art} = require('../models');


const router = express.Router();


router.post('/add', isAuthenticated, async (req, res) => {
    const id_art = parseInt(req.body.id_art, 10);
    const quantity = parseInt(req.body.quantity || 1, 10);
    const id_user = req.user.id;

    if (isNaN(id_art) || isNaN(quantity) || quantity < 1) {
        return res.status(400).send('Date invalide.');
    }

    try {
        const existing = await Cart.findOne({ where: { id_user, id_art } });

        if (existing) {
            existing.quantity += quantity;
            await existing.save();
        } else {
            await Cart.create({ id_user, id_art, quantity });
        }

        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send("Eroare la adăugare în coș.");
    }
});




router.get('/', isAuthenticated, async (req, res) => {
    const id_user = req.user.id;
    const transportCost = 20.00;
    const success = req.query.success === '1';

    try {
        const cartItems = await Cart.findAll({
            where: { id_user },
            include: [{
                model: Art,
                as: 'art',
                attributes: ['id_art', 'art_name', 'price', 'art_images']
            }]
        });

        const cartData = cartItems.map(item => {
            const art = item.art || {};
            const images = typeof art.art_images === 'string'
                ? art.art_images.split(',').map(s => s.trim())
                : [];

            return {
                id_art: art.id_art,
                quantity: item.quantity,
                art_name: art.art_name || 'Fără titlu',
                pret: !isNaN(+art.price) ? +art.price : 0,
                imagini: images
            };
        });

        res.render('cart', {
            cartItems: cartData,
            transportCost,
            success
        });
    } catch (err) {
        console.error('Eroare la afișarea coșului:', err.stack || err);
        res.status(500).send("Eroare la afișarea coșului.");
    }
});

router.post('/delete', isAuthenticated, async (req, res) => {
    const id_user = req.user.id;
    const id_art = parseInt(req.body.id_art, 10);

    if (isNaN(id_art)) {
        return res.status(400).send("ID produs invalid.");
    }

    try {
        const cartItem = await Cart.findOne({ where: { id_user, id_art } });
        if (!cartItem) {
            return res.status(404).send("Produsul nu există în coș.");
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1; // decrement quantity by 1
            await cartItem.save();
        } else {
            await Cart.destroy({ where: { id_user, id_art } }); // remove row if quantity is 1
        }
        console.log('Received id_art:', req.body.id_art);

        res.redirect('/cart');
    } catch (err) {
        console.error("Eroare la modificarea coșului:", err);
        res.status(500).send("Eroare la modificarea coșului.");
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    const { first_name, last_name, judet, oras, str, tele } = req.body;
    const id_user = req.user.id;

    if (isNaN(+tele)) return res.status(400).send("Număr de telefon invalid.");

    try {
        const cartItems = await Cart.findAll({ where: { id_user } });
        if (!cartItems.length) return res.send("Coșul tău este gol.");

        for (const item of cartItems) {
            await Order.create({
                id_user,
                id_art: item.id_art,
                first_name,
                last_name,
                judet,
                oras,
                strada: str,
                tele
            });
        }

        await Cart.destroy({ where: { id_user } });

        res.redirect('/cart?success=1');
    } catch (err) {
        console.error('Eroare la finalizarea comenzii:', err);
        res.status(500).send("Eroare la finalizarea comenzii.");
    }
});


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
module.exports = router;
const express = require('express');
const { isAuthenticated } = require('./middleware');
const { Cart, Order } = require('../models');


const router = express.Router();

// Adaugă în coș
// Adaugă produs în coș – metoda POST pe baza body
router.post('/cart/add', isAuthenticated, async (req, res) => {
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



// Checkout
router.post('/cart', isAuthenticated, async (req, res)  => {
    const { first_name, last_name, judet, oras, str, tele } = req.body;
    const id_user = req.user.id;

    if (isNaN(+tele)) return res.status(400).send("Invalid phone number.");

    try {
        const cartItems = await Cart.findAll({ where: { id_user } });
        if (!cartItems.length) return res.send("Your cart is empty.");


        for (const item of cartItems) {
            await Order.create({ id_user, id_art: item.id_art, first_name, last_name, judet, oras, strada: str, tele });

        }        console.log("Order.create type:", typeof Order.create);


        await Cart.destroy({ where: { id_user } });

        res.redirect('/cart?success=1');
    } catch (err) {
        console.error(err);
        res.status(500).send("Checkout error.");
    }
});
router.post('/cart/delete', isAuthenticated, async (req, res) => {
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

module.exports = router;

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cart = require('../models/cart');

router.post('/addCart', async (req, res) => {
    try {
        const bookCheck = await cart.findOne({ id: req.body.id })
        if (!bookCheck) {
            const cartProd = new cart({
                id: req.body.id,
                name: req.body.name,
                cover: req.body.cover,
                quantity: req.body.quantity,
                price: req.body.price,
            })
            await cartProd.save();
            res.status(200).json({ message: "book added to cart" }, cartProd);
        } else {
            res.status(200).json({ message: "book already added to cart" });
        }

    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})

router.get('/cart', async (req, res) => {
    try {
        const cartList = await cart.find();
        if (cartList.length === 0) {
            return res.status(200).json({ message: "cart is empty", cart: [] });
        }
        res.status(200).json({ message: "cart fetched", data: cartList });
    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})

router.put('/cartUpdate', async (req, res) => {
    try {
        const cartId = req.body._id;
        const updateQuant = req.body.quantity;
        const updatePrice = req.body.price;

        const changeBook = await cart.findOneAndUpdate(
            { _id: cartId },
            { $set: { quantity: updateQuant, price: updatePrice } },
            { new: true }
        );
        if (changeBook == null) {
            return res.status(400).json({ message: 'product not found' });
        } else {
            res.status(200).json({ message: 'cart product updated successfully', data: changeBook });
        }
    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})

router.delete('/removeCart', async (req, res) => {
    try {
        cartid = req.body._id
        cartremoved = await cart.findOneAndDelete({ '_id': cartid })
        if (cartremoved.deletedCount == 0) {
            return res.status(404).json({ message: 'product not found' });
        } else {
            res.status(200).json({ message: 'book removed successfully', data: cartremoved });
        }
    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})
router.delete('/clearCart', async (req, res) => {
    try {
        const result = await cart.deleteMany({})
        res.status(200).json({ message: "cart cleared" })
    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    } 
})
module.exports = router;
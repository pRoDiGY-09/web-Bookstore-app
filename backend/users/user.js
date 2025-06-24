const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcypt = require('bcryptjs');
const passport = require('passport');
const secretKey = 'your_secret_key';
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    try {
        const checkEmail = await user.findOne({ email: req.body.email })
        if (!checkEmail) {
            const hashedPassword = bcypt.hashSync(req.body.password, 10);
            const newUser = new user({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                admin: false
            })
            await newUser.save()
            res.status(200).json({ message: 'user registered!', newUser })
        } else {
            res.status(200).json({ message: 'Email already exists' })
        }

    } catch (err) {
        res.status(500).json({ message: "ran into an error", err })
    }
})

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password

        const userNew = await user.findOne({ email })
        if (!userNew) {
            return res.json({ message: "user not found!" })
        }
        const isMatch = await bcypt.compare(password, userNew.password)
        if (!isMatch) {
            return res.json({ message: "password incorrect!" })
        } else {
            const payload = { id: userNew._id };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            res.json({
                success: true,
                token: 'Bearer ' + token,
                user: {
                    id: userNew._id,
                    name: userNew.name,
                    admin: userNew.admin,
                    email: userNew.email
                }
            })
        }

    } catch (err) {
        res.status(500).json({ message: "ran into an error", err })
    }
})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    // If authentication succeeds, req.user will be set
    res.json({ user: req.user });
});

// router.get('/profile', authenticateJWT, (req, res) => {
//     res.json({ message: 'You are authenticated', user: req.user });
// });

module.exports = router;
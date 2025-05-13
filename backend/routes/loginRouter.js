const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/Signupmodel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(token);
        

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (err) {
        res.status(500).json({
            message: 'Login failed',
            error: err.message

        })
        console.log(err);


    }

})


module.exports = router;
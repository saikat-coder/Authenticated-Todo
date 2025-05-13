const express = require('express');
const router = express.Router()
const User = require('../models/Signupmodel');
const todomodel = require('../models/Todomodel')
const authMiddleware = require('../middleware/Auth')


router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId=req.user.id
        const task=await todomodel.find({user:userId})
        res.status(200).json(task)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
})

module.exports = router;
const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/Auth')


const todomodel = require('../models/Todomodel')

router.put('/:id', authMiddleware, async (req, res) => {
    console.log('PUT / route hit');
    try {
        const { id } = req.params
        const userId = req.user.id
        console.log("Received:", req.params);
        const result = await todomodel.findByIdAndUpdate(
            { _id: id, user: userId },
            { done: true },
            { new: true }
        )
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;
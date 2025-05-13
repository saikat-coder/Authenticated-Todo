const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/Auth')


const todomodel = require('../models/Todomodel')

router.delete('/:id', authMiddleware, async (req, res) => {
    console.log('DELETE / route hit');
    try {
        const { id } = req.params
        const userId = req.user.id
        console.log("Received:", req.params);
        const result = await todomodel.findByIdAndDelete(
            {
                _id: id,
                user: userId
            }
        )
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;
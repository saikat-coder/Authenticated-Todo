const express = require('express');
const router = express.Router()
const todomodel = require('../models/Todomodel')
const authMiddleware = require('../middleware/Auth')

router.post('/', authMiddleware, async (req, res) => {
     console.log('POST / route hit add');
    try {
        console.log("Request body:", req.body);       // ✅ log body
        console.log("Authenticated user:", req.user);
        const { task } = req.body
        const newTask = new todomodel({ task, user: req.user.id })
        const result = await newTask.save()
        console.log(result);
        console.log("Saved task:", result);
        res.json(result)

    } catch (error) {
        console.error(error.message)
        res.json(error)
    }
})





module.exports = router;
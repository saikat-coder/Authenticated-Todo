const express= require('express');
const bcrypt = require('bcrypt');
const router=express.Router()

const usermodel=require('../models/Signupmodel')

router.post('/', async(req,res)=>{
    try {

        const {username,email,password}=req.body;

        const existingUser=await usermodel.findOne({email})
        if (existingUser) {
            return res.status(409).json({ message: 'User already exist'});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new usermodel({username,email,password:hashedPassword})
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully'});
              
    } catch (error) {
        res.status(500).json({
            message: 'Registration failed',
            error: error.message,
          });
    }
})

module.exports=router;
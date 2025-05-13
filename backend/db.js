const mongoose=require('mongoose')
require('dotenv').config();


const MONGO_URL=process.env.MONGO_URL;

const db = async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Database Connection feild",error);
        throw error;
        
    }
}

module.exports= db;
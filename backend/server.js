const express = require('express')
const cors = require('cors')
const db = require('./db');
require('dotenv').config();
const signupRouter = require('./routes/signupRouter')
const loginRouter = require('./routes/loginRouter')
const todoAddRouter=require('./routes/todoAddRouter')
const todoGetRouter=require('./routes/todoGetRouter')
const update=require('./routes/todoUpdateRouter')
const remove=require('./routes/todoDeleteRouter')



const app = express()
app.use(cors())
app.use(express.json())

PORT = process.env.PORT || 3001;


// app.get('/',(req,res)=>{
//   console.log("Root route accessed");
//   res.send("Heyy")
// })


app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/add',todoAddRouter)
app.use('/get',todoGetRouter)
app.use('/update',update)
app.use('/remove',remove)
















const startServer = async () => {
  try {

    await db();

    await new Promise((resolve, reject) => {
      const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        resolve();
      });
      server.on('error', reject);

    })
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
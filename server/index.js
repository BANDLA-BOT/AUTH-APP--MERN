import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

//DATABASE
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to the Database')
})
.catch((err)=>{
    console.log(err.message)
})










//LISTENING TO SERVER
app.listen(8000, ()=>{
    console.log('Server running on Port 3000')
})
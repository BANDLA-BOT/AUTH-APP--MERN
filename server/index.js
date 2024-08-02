import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//DATABASE
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to the Database')
})
.catch((err)=>{
    console.log(err.message)
})

const app = express()

app.listen(8000, ()=>{
    console.log('Server running on Port 3000')
})
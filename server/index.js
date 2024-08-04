import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import authRoute from './routes/authRoute.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

//DATABASE
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to the Databae')
})
.catch((err)=>{
    console.log(err.message)
})
//LISTENING TO SERVER
app.listen(8000, ()=>{
    console.log('Server running on Port 000')
})


//API's
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoute)


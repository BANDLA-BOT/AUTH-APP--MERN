import User from '../models/user.model.js'
import { errorHandler } from '../utils/errorHandler.js'
import bcryptjs from 'bcryptjs'


export const signup = async(req,res, next)=>{
    const { username, email, password } = req.body
    if(!req.body){
        return res.status(300).json({message:"Fields have no Data init"})
    }
    if(password === undefined){
        return res.status(300).json({message:"Fields have no Data init"})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = bcryptjs.hashSync(password, salt)
    const newUser = new User({username, email, password:hashedPassword})
    try {
        await newUser.save()
        res.status(201).json({message:"registered successfully"})
    } catch (error) {
        next(errorHandler(500,'Something went wrong',))
    }
}
import User from '../models/user.model.js'
import { errorHandler } from '../utils/errorHandler.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
export const login = async(req,res, next)=>{
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({email})
        if(!validUser)return next(errorHandler(404, 'User not found on this email'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong credentials'))
        const token = jwt.sign({id:validUser._id}, process.env.JWT_ACCESS_KEY_LOGIN, {expiresIn:'15m'})
        const { password:hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000); //1 hour
        res.cookie('access_token', token, { httpOnly:true, expires:expiryDate}).status(200).json({
            user:rest,
            message:"Logged in"
        })
    } catch (error) {
        next(error)
    }
}
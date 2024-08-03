import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
export const signup = async(req,res)=>{
    const { username, email, password } = req.body
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = bcryptjs.hashSync(password, salt)
    const newUser = new User({username, email, password:hashedPassword})
    try {
        await newUser.save()
        res.status(201).json({message:"registered successfully"})
    } catch (error) {
        res.status(500).json({Message:"Internal server error", Error:error.message})
    }

}
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import User from '../Models/userModel.js'

export const test = (req,res)=>{
    res.json({message:'Api working'})
}
export const updateUser = async(req,res,next)=>{
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403,'You are not allowed to update this user'))
    }   
    if (req.body.password) {
        if (req.body.password.length <6) {
            return next(errorHandler(400,'password must be at least 6 characters '))
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    } 
    if (req.body.username) {
        if (req.body.username.length<7 || req.body.username.length >20) {
            return next(errorHandler(400,'username must be between 7 and 20 characters'))
        }
        if (req.body.username.includes(' ')) {  // Checking for a space
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400,'Username must be lowercase'))
        }
        if (/[A-Z]/.test(req.body.username)) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
    }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilepicture:req.body.profilepicture,
                    password:req.body.password
                }
            },{new:true});
            const {password, ...rest} = updateUser._doc;
            res.status(200).json(rest)
        } catch (error) {
            next(error)
        }
    
}
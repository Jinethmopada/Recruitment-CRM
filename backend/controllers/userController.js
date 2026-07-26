import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

export const registerUser = async(req, res) => {
    try {
        const {fullName,email,password} = req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered !!"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            fullName,
            email,
            password: hashedPassword
        })

        const token = generateToken(user._id);

        await user.save();

        res.status(201).json({
            success:true,
            message:"User Registered Successfully !!",
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            const isPasswordMatch = await bcrypt.compare(password,user.password);
            if(isPasswordMatch){
                const token = generateToken(user._id)
                return res.status(200).json({success:true,token,message:"User Login Success"});
            }
        }
        return res.status(401).json({success:false,message:"Invalid Email or Password"})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}
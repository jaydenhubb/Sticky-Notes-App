import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user"
import { hashPass } from "../utils/hashPassword";
import bcrypt from "bcrypt"



export const getAuthenticatedUser : RequestHandler =async (req, res, next) => {
    // const authenticatedUser = req.session.userId
    try {
        // if(!authenticatedUser){
        //     throw createHttpError(401, "User not authenticated")
        // }

        const user = await UserModel.findById(req.session.userId).select("+email").exec()

    } catch (error) {
        next(error)
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}
export const signUp:RequestHandler<unknown,unknown,SignUpBody,unknown>= async (req, res, next)=>{
    const {username, email, password} = req.body
    try {
        if(!username || !email || !password){
            throw createHttpError(400, "Please fill in all required fields")
        }
        const usernameExists = await UserModel.findOne({username}).exec()
        if(usernameExists){
            throw createHttpError(409, "Username already taken")
        }
        const emailExists = await UserModel.findOne({email}).exec()
        if(emailExists){
            throw createHttpError(409, "Email already exists")
        }
        const hashedPassword = hashPass(password)

        const newUser = await UserModel.create({
            username,
            email,
            password:hashedPassword
        })
        req.session.userId = newUser._id
        res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }
}

interface loginBody {
    username?: string,
    password?: string
}
export const login:RequestHandler<unknown, unknown, loginBody, unknown> = async (req, res, next)=>{
    const {username, password} = req.body
    try {
        if(!username||!password){
            throw createHttpError(400, "Username and password are required")
        }
        const usernameExists = await UserModel.findOne({username}).select("+password").exec()
        if(!usernameExists){
            throw createHttpError(401, "Invalid credentials")
        }
        const hashedPassword = await bcrypt.compare(password, usernameExists.password)
        if(!hashedPassword){
            throw createHttpError(401, "Invalid credentials")
        }
        req.session.userId = usernameExists._id
        res.status(201).json(usernameExists)
        
    } catch (error) {
        next(error)
    }
}

export const logout:RequestHandler=(req, res, next)=>{
    req.session.destroy(error=>{
        if(error){
            next(error)
        }else{
            res.sendStatus(200)
        }
    })
}
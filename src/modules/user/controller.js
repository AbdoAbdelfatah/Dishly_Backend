import { UserService } from "./service.js";
import { ErrorClass } from "../../utils/error.util.js";
import { signToken, verify } from "../../utils/jwt.util.js"; 
import { comparePassword } from "../../utils/hash.util.js";
import e from "express";
const userService = new UserService();
export class UserController {

    async registerUser(req, res, next) {
        try{
            const {fullName,email,password,gender,age,phone} = req.body;
            
            if(!fullName || !email || !password||!gender||!age){
                return next(new ErrorClass('Full name, gender, age, email and password are required',400,'Validation Error','user/register'));
            }
            const existingUser = await userService.getUserByEmail(email);
            if(existingUser){
                return next(new ErrorClass('Email already in use',409,'Conflict Error'));
            }
            const token = await userService.createUser({fullName,email,password,phone});
           
            res.status(201).json({message:'User registered successfully',userToken:token});
        }catch(error){
            next(error);
        }
    }

    async confirmEmail(req, res, next) {
        try{
            const {token} = req.params;
            if(!token){
                return next(new ErrorClass('Token is required',400,'Validation Error'));
            }
            const payload = verify(token);
            if(!payload?.userId){
                return next(new ErrorClass('Invalid token payload',400,'Validation Error'));
            }
            const updatedUser = await userService.updateUser(payload.userId,{isConfirmed:true});
            res.status(200).json({message:'Email confirmed successfully',updatedUser});
        }
        catch(error){
            next(error);
        }
    }
    async loginUser(req, res, next) {
        try{
            const {email,password} = req.body;
            if(!email || !password){
                return next(new ErrorClass('Email and password are required',400,'Validation Error'));
            }
            const user = await userService.getUserByEmail(email);
            if(!user){
                return next(new ErrorClass('Invalid email or password',401,'Authentication Error'));
            }
            if(!user.isConfirmed){
                return next(new ErrorClass('Please confirm your email before login',401,'Authentication Error'));
            }
            const isPasswordValid = await comparePassword(password,user.password);
            if(!isPasswordValid){
                return next(new ErrorClass('Invalid email or password',401,'Authentication Error'));
            }
            const token = signToken({userId:user._id});
            res.status(200).json({message:'Login successful',userToken:token});
        }
        catch(error){
            next(error);
        }
    }


}
    
import User from '../../models/user.model.js';
import { ErrorClass } from '../../utils/error.util.js';
import {signToken} from '../../utils/jwt.util.js';
import {sendMail} from '../../utils/mail.util.js';

export class UserService {


    async createUser(userData) {
        try {
            
            const user =new User(userData);
            const token = signToken({ userId: user._id });
            // confirmation Link
            
            const confirmationLink = `http://localhost:5000/user/confirm-email/${token}`;
            // send email
            const isEmailSent = await sendMail({
                to: user.email,
                subject: "Welcome to our app",
                html: `<a href="${confirmationLink}">Click here to confirm your email</a>`,
            });
        
            if (isEmailSent.rejected.length) {
                return res.status(400).json({ message: "Email not sent" });
            }
            await user.save();
            return token;
        }
        catch (error) {
            throw new ErrorClass('Failed to create user', 500, error.message, 'UserService.createUser');
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            throw new ErrorClass('Failed to get user', 500, error.message, 'UserService.getUserByEmail');
        }
    }
    
    async updateUser(userId, updateData) {
        try {
            const user =  await UserfindById(userId);
            if (!user) {
                throw new ErrorClass('User not found', 404, { userId }, 'UserService.updateUser');
            }
            Object.assign(user, updateData);
            await user.save();
            return user;
        } catch (error) {
            throw new ErrorClass('Failed to update user', 500, error.message, 'UserService.updateUser');
        }
    }

    async deleteUser(userId) {
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                throw new ErrorClass('User not found', 404, { userId }, 'UserService.deleteUser');
            }
            return user;
        } catch (error) {
            throw new ErrorClass('Failed to delete user', 500, error.message, 'UserService.deleteUser');
        }
    }

}


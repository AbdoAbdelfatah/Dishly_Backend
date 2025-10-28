import jwt from 'jsonwebtoken';

export function signToken(payload) {
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

export function verify(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}
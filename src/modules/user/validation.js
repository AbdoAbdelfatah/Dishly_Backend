import Joi from "joi";


export const createUserSchema = {
    body: Joi.object({
        fullName : Joi.string().min(6).max(50).required(),
        email : Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password : Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!%*_?&]{8,}$/).required(),
        repeat_password: Joi.ref('password'),
        gender:Joi.string().valid('male','female').required(),
        age:Joi.number().min(0).required(),
        phone : Joi.string().pattern(/^[0-9]{10,15}$/).optional()
    })  
}

export const confirmEmailSchema = {
    params: Joi.object({
        token: Joi.string().required()
    })
}

export const loginUserSchema = {
    body: Joi.object({
        email : Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password : Joi.string().required()
    })
}
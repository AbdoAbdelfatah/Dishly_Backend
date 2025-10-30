import Joi from "joi";


export const createCommentSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        menuItemId: Joi.string().required(),
        content: Joi.string().min(1).max(500).required(),
        rating: Joi.number().min(1).max(5).required()
    })
};

export const getCommentsByMenuItemSchema = {
    params: Joi.object({
        menuItemId: Joi.string().required()
    })
};
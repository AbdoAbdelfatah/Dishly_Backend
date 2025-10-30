import Joi from 'joi';
import {Type} from 'mongoose';
const objectIdRule=(value,helper)=>{
    const isValid = Type.ObjectId.isValid(value);
    return isValid ? value : helper.message(`${value} is not a valid ObjectId`)
}
export const createOfferSchema = {
    body: Joi.object({
        title: Joi.string().min(3).max(100).required(),
        imageUrl: Joi.string().uri().optional(),
        description: Joi.string().max(500).optional(),
        discountPercent: Joi.number().min(1).max(100).required(),
        menuItems: Joi.array().items(Joi.custom(objectIdRule)).min(1).required(),
        isActive: Joi.boolean().optional()
    })
};

export const updateOfferSchema = {
    body: Joi.object({
        title: Joi.string().min(3).max(100).optional(),
        imageUrl: Joi.string().uri().optional(),
        description: Joi.string().max(500).optional(),
        discountPercent: Joi.number().min(1).max(100).optional(),
        menuItems: Joi.array().items(Joi.custom(objectIdRule)).min(1).optional(),
        isActive: Joi.boolean().optional()
    })
};

export const getOfferSchema = {
    params: Joi.object({
        offerId: Joi.custom(objectIdRule).required()
    })
};

export const deleteOfferSchema = {
    params: Joi.object({
        offerId: Joi.custom(objectIdRule).required()
    })
};

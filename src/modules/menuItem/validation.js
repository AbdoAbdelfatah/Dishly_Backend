import Joi from "joi";

const objectIdRule=(value,helper)=>{
    const isValid = Type.ObjectId.isValid(value);
    return isValid ? value : helper.message(`${value} is not a valid ObjectId`)
}

export const createMenuItemSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(3).max(50).required(),
    rate: Joi.number().min(1).max(5),
    isAvailable: Joi.boolean(),
    imageUrl: Joi.string().uri().optional(),
  })
};

export const getMenuItemsByCategorySchema = {
  params: Joi.object({
    category: Joi.string().min(3).max(50).required(),
  })
};

export const updateMenuItemSchema = {
    params: Joi.object({
        id: Joi.string().custom(objectIdRule).required(),
    }),
    body: Joi.object({
        name: Joi.string().min(3).max(100).optional(),
        description: Joi.string().max(500).optional(),
        price: Joi.number().min(0).optional(),
        category: Joi.string().min(3).max(50).optional(),
        rate: Joi.number().min(1).max(5),
        isAvailable: Joi.boolean(),
        imageUrl: Joi.string().uri().optional(),
    })
};

export const deleteMenuItemSchema = {
    params: Joi.object({
        id: Joi.string().custom(objectIdRule).required(),
    })
};

import Joi from "joi";

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const getCartSchema = {
  params: Joi.object({ userId: objectId.required() }),
};

export const clearCartSchema = {
  params: Joi.object({ userId: objectId.required() }),
};

export const addItemSchema = {
  body: Joi.object({
    userId: objectId.required(),
    menuItemId: objectId.required(),
    quantity: Joi.number().integer().min(1).default(1),
  }),
};

export const updateItemSchema = {
  body: Joi.object({
    userId: objectId.required(),
    menuItemId: objectId.required(),
    quantity: Joi.number().integer().min(1).required(),
  }),
};

export const removeItemSchema = {
  body: Joi.object({
    userId: objectId.required(),
    menuItemId: objectId.required(),
  }),
};


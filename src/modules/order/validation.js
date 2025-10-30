import Joi from "joi";

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const checkoutSchema = {
  body: Joi.object({
    userId: objectId.required(),
    paymentMethod: Joi.string().valid("cash", "card", "online").default("cash"),
  }),
};

export const confirmSchema = {
  body: Joi.object({
    orderId: objectId.required(),
    paymentIntentId: Joi.string().required(),
  }),
};

export const listOrdersSchema = {
  params: Joi.object({ userId: objectId.required() }),
};

export const getOrderSchema = {
  params: Joi.object({ orderId: objectId.required() }),
};


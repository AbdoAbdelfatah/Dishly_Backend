import express from "express";
import { errorHandler } from "../middlewares/error.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import {
  checkout,
  confirm,
  listUserOrders,
  getOrder,
} from "../controllers/order.controller.js";
import {
  checkoutSchema,
  confirmSchema,
  listOrdersSchema,
  getOrderSchema,
} from "../validations/order.validation.js";

const router = express.Router();

router.post(
  "/checkout",
  validationMiddleware(checkoutSchema),
  errorHandler(checkout)
);

router.post(
  "/confirm",
  validationMiddleware(confirmSchema),
  errorHandler(confirm)
);

router.get(
  "/user/:userId",
  validationMiddleware(listOrdersSchema),
  errorHandler(listUserOrders)
);

router.get(
  "/:orderId",
  validationMiddleware(getOrderSchema),
  errorHandler(getOrder)
);

export default router;


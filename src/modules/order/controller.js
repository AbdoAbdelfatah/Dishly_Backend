import {
  createOrderFromCart,
  getUserOrders,
  getOrderById,
  createMockPaymentIntent,
  confirmMockPaymentIntent,
} from "../services/order.service.js";
import Order from "../models/order.model.js";

export const checkout = async (req, res) => {
  const { userId, paymentMethod = "cash" } = req.body;

  // Create order from cart first
  const order = await createOrderFromCart(userId, { paymentMethod });

  if (paymentMethod === "cash") {
    return res.status(201).json({ order });
  }

  const intent = await createMockPaymentIntent(order.totalAmount, "usd");
  // Optionally, we could persist payment intent ID on order in a real app
  return res.status(201).json({ order, paymentIntent: intent });
};

export const confirm = async (req, res) => {
  const { orderId, paymentIntentId } = req.body;
  const confirmation = await confirmMockPaymentIntent(paymentIntentId);
  if (confirmation.status !== "succeeded") {
    return res.status(400).json({ message: "Payment failed", confirmation });
  }
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status: "confirmed" },
    { new: true }
  ).populate("items.menuItem");
  res.json({ order, confirmation });
};

export const listUserOrders = async (req, res) => {
  const { userId } = req.params;
  const orders = await getUserOrders(userId);
  res.json({ orders });
};

export const getOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await getOrderById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ order });
};


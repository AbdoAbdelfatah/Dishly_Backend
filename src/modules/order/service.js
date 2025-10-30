import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import MenuItem from "../models/menuItem.model.js";

export async function createOrderFromCart(userId, { paymentMethod = "cash" } = {}) {
  const cart = await Cart.findOne({ user: userId }).populate("items.menuItem");
  if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

  const items = [];
  let totalAmount = 0;
  for (const cartItem of cart.items) {
    const item = cartItem.menuItem;
    if (!item) continue;
    items.push({ menuItem: item._id, quantity: cartItem.quantity });
    totalAmount += item.price * cartItem.quantity;
  }

  const order = await Order.create({
    user: userId,
    items,
    totalAmount,
    status: paymentMethod === "cash" ? "confirmed" : "pending",
    paymentMethod,
  });

  cart.items = [];
  await cart.save();

  return order.populate("items.menuItem");
}

export async function getUserOrders(userId) {
  return Order.find({ user: userId })
    .populate("items.menuItem")
    .sort({ createdAt: -1 });
}

export async function getOrderById(orderId) {
  return Order.findById(orderId).populate("items.menuItem");
}


export async function createMockPaymentIntent(amount, currency = "usd") {
    
}

export async function confirmMockPaymentIntent(paymentIntentId) {
}

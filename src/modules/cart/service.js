import Cart from "../../models/cart.model.js";
import MenuItem from "../../models/menuItem.model.js";

export async function getCartByUser(userId) {
  let cart = await Cart.findOne({ user: userId }).populate("items.menuItem");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate("items.menuItem");
  }
  return cart;
}

export async function addItem(userId, menuItemId, quantity = 1) {
  const menuItem = await MenuItem.findById(menuItemId);
  if (!menuItem || !menuItem.isAvailable) {
    throw new Error("Menu item not available");
  }
  const cart = await getCartByUser(userId);
  const existing = cart.items.find((i) => i.menuItem._id.toString() === menuItemId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ menuItem: menuItemId, quantity });
  }
  await cart.save();
  return cart.populate("items.menuItem");
}

export async function updateItemQuantity(userId, menuItemId, quantity) {
  if (quantity < 1) {
    return removeItem(userId, menuItemId);
  }
  const cart = await getCartByUser(userId);
  const target = cart.items.find((i) => i.menuItem._id.toString() === menuItemId);
  if (!target) throw new Error("Item not in cart");
  target.quantity = quantity;
  await cart.save();
  return cart.populate("items.menuItem");
}

export async function removeItem(userId, menuItemId) {
  const cart = await getCartByUser(userId);
  cart.items = cart.items.filter((i) => i.menuItem._id.toString() !== menuItemId);
  await cart.save();
  return cart.populate("items.menuItem");
}

export async function clearCart(userId) {
  const cart = await getCartByUser(userId);
  cart.items = [];
  await cart.save();
  return cart.populate("items.menuItem");
}

import { Cart } from "../models/cart.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart?.items || []);
});

const addToCart = asyncHandler(async (req, res) => {

  const { userId, item } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [item] });
  } else {
    const index = cart.items.findIndex(p => p.productId === item.productId);
    if (index >= 0) {
      cart.items[index].quantity += 1;
    } else {
      cart.items.push(item);
    }
  }

  await cart.save();
  res.json(cart.items);

});

const removeFromCart = asyncHandler(async (req, res) => {

  const { userId, productId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.productId !== productId);

  await cart.save();
  res.json(cart.items);

});

const clearCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = [];
  await cart.save();
  res.json([]);
});


const updateCartQuantity = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(item => item.productId === productId);
  if (!item) return res.status(404).json({ message: "Product not in cart" });

  item.quantity = quantity;
  await cart.save();

  res.json(cart.items);
});

export {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart
};


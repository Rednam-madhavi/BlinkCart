import { Wishlist } from '../models/wishlist.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getWishlist = asyncHandler(async (req, res) => {
  const list = await Wishlist.findOne({ userId: req.params.userId });
  res.json(list?.items || []);
});

const addToWishlist = asyncHandler(async (req, res) => {

  const { userId, item } = req.body;
  let list = await Wishlist.findOne({ userId });

  if (!list) {
    list = new Wishlist({ userId, items: [item] });
  } else {
    const exists = list.items.some(i => i.productId === item.productId);
    if (!exists) list.items.push(item);
  }

  await list.save();
  res.json(list.items);
  
});

const removeFromWishlist = asyncHandler(async (req, res) => {

  const { userId, productId } = req.params;

  const list = await Wishlist.findOne({ userId });

  if (!list) return res.status(404).json({ message: "Wishlist not found" });

  list.items = list.items.filter(item => item.productId !== productId);
  
  await list.save();
  res.json(list.items);
});

export {
  getWishlist,
  addToWishlist,
  removeFromWishlist
}
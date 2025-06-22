import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from '../controllers/wishlist.controller.js';

const router = express.Router();

router.get('/:userId', getWishlist);
router.post('/', addToWishlist);
router.delete('/:userId/:productId', removeFromWishlist);

export default router;

import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/wishlist').post(verifyJwt, addToWishlist)
router.route('/:userId').get(verifyJwt, getWishlist)
router.route('/:userId/:productId').delete(verifyJwt, removeFromWishlist)

export default router;

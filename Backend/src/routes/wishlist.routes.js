import express from 'express';
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} from '../controllers/wishlist.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/wishlist', verifyJwt, addToWishlist);
router.get('/wishlist/:userId', verifyJwt, getWishlist);
router.delete('/wishlist/:userId/:productId', verifyJwt, removeFromWishlist);

export default router;

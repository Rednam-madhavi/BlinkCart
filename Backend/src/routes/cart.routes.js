import express from 'express';
import { getCart, addToCart, removeFromCart, updateCartQuantity } from '../controllers/cart.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').post(verifyJwt, addToCart);
router.route('/:userId').get(verifyJwt, getCart);
router.route('/:userId/:productId')
    .delete(verifyJwt, removeFromCart)
    .patch(verifyJwt, updateCartQuantity);

export default router;
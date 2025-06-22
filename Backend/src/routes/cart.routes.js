import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cart.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/', addToCart);
router.delete('/:userId/:productId', removeFromCart);

export default router;

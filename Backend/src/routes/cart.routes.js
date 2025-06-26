import { Router } from 'express';
import {
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
} from "../controllers/cart.controller.js";
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').post(verifyJwt, addToCart);
router.route('/:userId').get(verifyJwt, getCart);
router.route('/:userId/:productId')
    .delete(verifyJwt, removeFromCart)
    .patch(verifyJwt, updateCartQuantity);

router.delete('/:userId/clear', verifyJwt, clearCart);

export default router;
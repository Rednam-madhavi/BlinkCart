import express from 'express'
import { getCart, addToCart, removeFromCart } from '../controllers/cart.controller.js'
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.route('/').post(verifyJwt, addToCart)
router.route('/:userId').get(verifyJwt, getCart)
router.route('/:userId/:productId').delete(verifyJwt, removeFromCart)

export default router

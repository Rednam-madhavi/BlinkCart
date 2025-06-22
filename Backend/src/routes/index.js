// backend/src/routes/index.js
import { Router } from 'express';
import userRouter from './user.routes.js';
import productRouter from './product.routes.js';
import cartRouter from './cart.routes.js';
import wishlistRouter from './wishlist.routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/wishlist', wishlistRouter);

// Example route definition
router.get('/users/me', userController.getCurrentUser);
export default router;
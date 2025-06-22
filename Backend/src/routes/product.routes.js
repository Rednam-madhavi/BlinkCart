import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct
} from '../controllers/product.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'; // Consistent import

const router = Router();

router.route('/').get(getAllProducts).post(verifyJwt, createProduct);

router.route('/:id').get(getProductById);

export default router;
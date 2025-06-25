import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJwt, logoutUser);
router.route('/me').get(verifyJwt, getCurrentUser);
router.route('/refresh-token').get(refreshAccessToken);

export default router;

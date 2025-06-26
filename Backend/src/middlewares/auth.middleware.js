import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken; // ✅ FROM COOKIE

  if (!token) {
    throw new ApiError(401, 'Unauthorized: No token found in cookies');
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again.',
      });
    }

    throw new ApiError(401, 'Invalid or expired token');
  }
});

export { verifyJwt };

import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, 'Unauthorized request: No token found');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // If token is expired — clear cookies and respond
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return res.status(401).json({
        success: false,
        message: 'Token expired, please log in again',
      });
    }

    // For other token errors
    throw new ApiError(401, 'Invalid or expired token');
  }
});

export { verifyJwt }

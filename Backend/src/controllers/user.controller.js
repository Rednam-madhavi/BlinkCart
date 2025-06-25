import { User } from '../models/user.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

// TOKEN GENERATION
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, 'Something went wrong while generating tokens');
    }
};

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    if ([username, email, password].some(field => field?.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        throw new ApiError(409, 'User with email or username already exists');
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        role: role || 'user'
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong while registering user');
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User registered successfully')
    );
});

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    // For development only
    const cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(
            new ApiResponse(200, { user: loggedInUser }, 'User logged in successfully')
        );
});

// LOGOUT
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax"
    };

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out"));
});

// GET CURRENT USER
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id).select('username email role createdAt');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({ user });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, 'Refresh token missing');
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(403, 'Invalid refresh token');
        }

        const newAccessToken = user.generateAccessToken();

        res
            .cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({ success: true, accessToken: newAccessToken });

    } catch (error) {
        throw new ApiError(403, 'Invalid or expired refresh token');
    }
});


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};

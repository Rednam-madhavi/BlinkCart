import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/apiResponse.js'
import mongoose from 'mongoose'

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "User not found while generating tokens")
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating refresh and access token', error)
  }
}

const registerUser = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body
  console.log('BODY:\n', req.body)

  if ([username, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All field are required')
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, 'User with email or username already exists')
  }

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering')
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, 'User Registered Successfully')
  )

})

const loginUser = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body

  if (!(username || email)) {
    throw new ApiError(400, 'username or email required')
  }

  const user = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (!user) {
    throw new ApiError(404, 'user with provided username or email is not found')
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, 'Password is incorrect')
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

  const LoggedInUser = await User.findById(user._id).select('-password -refreshToken')

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, { user: LoggedInUser, accessToken, refreshToken }, 'User Login Successful')
    )

})

const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(
      new ApiResponse(200, null, 'User Logout Successful')
    )
})


export {
  registerUser,
  loginUser,
  logoutUser,
}
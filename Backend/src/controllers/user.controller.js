import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'

const registerUser = asyncHandler(async (req, res) => {

  const { username, email, fullName, password } = req.body
  console.log('BODY:\n', req.body)

  // validation
  if ([username, email, fullName, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All field are required')
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  // console.log(existedUser)

  if (existedUser) {
    throw new ApiError(409, 'User with email or username already exists')
  }

  // images check
  const avatarLocalPath = req.files?.avatar[0]?.path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path  // rises error so we solve using logic below

  let coverImageLocalPath
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar file is required')
  }
  console.log('FILES:\n', req.files)


  // upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(404, 'Avatar file is required')
  }

  // creating user object
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'  // removing passwrod and refresh tokens
  )

  // user creation check
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering')
  }

  // return response
  return res.status(201).json(
    new ApiResponse(200, createdUser, 'User Registered Successfully')
  )

})

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body

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
    req.user._id,
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
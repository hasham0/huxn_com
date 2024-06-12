import asyncHandler from "../helpers/asyncHanlder.js";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { ACCESS_TOKEN, REFRESH_TOKEN, cookieOptions } from "../constant.js";

//note: CREATE USER_
const createUser = asyncHandler(async (request, response) => {
  const { username, email, password, isAdmin } = request.body;

  /* check validation */
  if ([username, email, password].some((item) => item?.trim() === "")) {
    throw new Error("please fill all fields");
  }
  /* check user if existed */
  const isUserExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    throw new Error("user already existed");
  }

  /* create new user */
  const createNewUser = await User.create({
    username,
    email,
    password,
    isAdmin: isAdmin || false,
  });

  /* generate access token */
  const data = {
    _id: createNewUser._id.toString(),
    email: createNewUser.email,
  };
  const accessTokenGen = generateAccessToken(data);
  const refreshTokenGen = generateAccessToken(data._id);

  /* send responce */
  response
    .status(200)
    .cookie(ACCESS_TOKEN, accessTokenGen, cookieOptions)
    .cookie(REFRESH_TOKEN, refreshTokenGen, cookieOptions)
    .json({
      message: "user created successfully",
      data: createNewUser,
    });
});

//note: LOGIN USER_
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  /* check validation */
  if ([email, password].some((item) => item?.trim() === "")) {
    throw new Error("please fill all fields");
  }
  /* check user if existed */
  const isUserExists = await User.findOne({
    $or: [{ email }],
  }).select("+password");

  if (!isUserExists) {
    throw new Error("user not exist");
  }

  /* check if password valid or not */
  const isPasswordValid = await isUserExists.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new Error("password not matched");
  }
  /* generate access token */
  const data = {
    _id: isUserExists._id.toString(),
    email: isUserExists.email,
  };

  const accesTokenGen = generateAccessToken(data);
  const refreshTokenGen = generateRefreshToken(data._id);

  /* get user */
  const user = await User.findOne({ _id: isUserExists._id });

  /* send response with cookie */
  response
    .status(200)
    .cookie(ACCESS_TOKEN, accesTokenGen, cookieOptions)
    .cookie(REFRESH_TOKEN, refreshTokenGen, cookieOptions)
    .json({ message: "User login successful", data: user });
});

//note: USER PROFILE_
const userProfile = asyncHandler(async (request, response) => {
  const { userId } = request;

  /* check user if already existed */
  const isUserExists = await User.findOne({ _id: userId });
  if (!isUserExists) {
    throw new Error("user not exist");
  }
  /* send responce */
  response.status(200).json({
    data: isUserExists,
  });
});

//note: UPDATE PROFILE EMIAL AND USERNAME_
const updateProfile = asyncHandler(async (request, response) => {
  const { userId } = request;
  const { username, email } = request.body;

  /* check user if  existed */
  const isUserExists = await User.findById({ _id: userId });
  if (!isUserExists) {
    throw new Error("user not exist");
  }

  /* check validation */
  if ([username, email].every((item) => item.trim() === "")) {
    throw new Error("please fill all fields");
  }

  /* update user profile */
  const updateUserEmailAndUsername = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: {
        username: username,
        email: email,
      },
    },
    { new: true }
  );

  await updateUserEmailAndUsername.save({ validateBeforeSave: false });

  /* send responce */
  response.status(200).json({
    message: "user profile update successfully",
    data: updateUserEmailAndUsername,
  });
});

//note: UPDATE PROFILE PASSWORD_
const updatePassword = asyncHandler(async (request, response) => {
  const { userId } = request;
  const { password } = request.body;

  /* check user if already existed */
  const isUserExists = await User.findById({ _id: userId });
  if (!isUserExists) {
    throw new Error("user not found");
  }

  /* check validation */
  if ([password].every((item) => item.trim() === "")) {
    throw new Error("please fill the password");
  }

  /* update user password */
  const updateUserPassword = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: {
        password: password,
      },
    },
    { new: true }
  );

  await updateUserPassword.save({ validateBeforeSave: true });

  /* send responce */
  response.status(200).json({
    message: "user password update successfully",
  });
});

//note: LOGOUT USER_
const logoutUser = asyncHandler(async (request, response) => {
  response
    .status(200)
    .clearCookie(ACCESS_TOKEN, {
      httpOnly: true,
      expires: new Date(0),
    })
    .clearCookie(REFRESH_TOKEN, {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({
      message: "user logout successfully",
    });
});

//note: DELETE USER_
const deleteUser = asyncHandler(async (request, response) => {
  const { userId } = request;

  /* check user if existed */
  const isUserExists = await User.findById({ _id: userId });
  if (!isUserExists) {
    throw new Error("user not found");
  }
  /* delete user */
  await User.findByIdAndDelete({ _id: userId });

  /* send responce */
  response.status(200).json({
    message: "user delete successfully",
  });
});

//! EXPORT CONTROLLERS_
export {
  createUser,
  loginUser,
  userProfile,
  updateProfile,
  updatePassword,
  logoutUser,
  deleteUser,
};

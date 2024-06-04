import asyncHandler from "../helpers/asyncHanlder.js";
import User from "../models/user.model.js";

//note: ALL USERS_
const allUsers = asyncHandler(async (request, response) => {
  const isUsersExist = await User.find({});

  /* check users if existed */
  if (!isUsersExist) {
    throw new Error({
      statusCode: 401,
      message: "user not found",
    });
  }

  /* send responce */
  response.json({
    data: isUsersExist,
  });
});

//note: GET USER BY ID_
const getUserByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;

  /* check user if existed */
  const isUserExist = await User.findById({ _id });

  if (!isUserExist) {
    throw new Error({
      statusCode: 401,
      message: "user not found",
    });
  }

  /* send responce */
  response.json({
    data: isUserExist,
  });
});

//note: UPDATE USER PROFILE_
const updateUserProfileByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const { username, email } = request.body;

  /* check user if existed */
  const isUserExists = await User.findById({ _id });

  if (!isUserExists) {
    throw new Error({
      statusCode: 401,
      message: "user not found",
    });
  }

  /* check validation */
  if ([username].every((item) => item.trim() === "")) {
    throw new Error({
      message: "please fill the password",
    });
  }

  /* update user role */
  const updateUserProfile = await User.findByIdAndUpdate(
    { _id },
    {
      $set: {
        username: username,
        email: email,
      },
    },
    { new: true }
  );

  await updateUserProfile.save({ validateBeforeSave: false });

  /* send responce */
  response.status(200).json({
    message: "user profile update successfully",
    data: updateUserProfile,
  });
});

//note: UPDATE USER ROLE_
const updateUserRoleByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const { isAdmin } = request.body;

  /* check user if existed */
  const isUserExists = await User.findById({ _id });

  if (!isUserExists) {
    throw new Error({
      statusCode: 401,
      message: "user not found",
    });
  }

  /* check validation */
  if ([isAdmin].every((item) => item.trim() === "")) {
    throw new Error({
      message: "please fill the password",
    });
  }

  /* update user role */
  const updateUserRole = await User.findByIdAndUpdate(
    { _id },
    {
      $set: {
        isAdmin: isAdmin,
      },
    },
    { new: true }
  );

  await updateUserRole.save({ validateBeforeSave: false });

  /* send responce */
  response.status(200).json({
    message: "user role update successfully",
    data: updateUserRole,
  });
});

//note: DELETE USER BY ID_
const deleteUserByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;

  /* check user if existed */
  const isUserExists = await User.findById({ _id });

  if (!isUserExists) {
    throw new Error({
      statusCode: 401,
      message: "user not found",
    });
  }

  /* check user if he is an admin */
  if (isUserExists.isAdmin) {
    throw new Error({
      statusCode: 401,
      message: "can not delete admin",
    });
  }

  /* delete user */
  await User.findByIdAndDelete({ _id });

  /* send responce */
  response.status(200).json({
    message: "user delete successfully",
  });
});

// !EXPORT CONTROLLERS_
export {
  allUsers,
  getUserByID,
  updateUserRoleByID,
  deleteUserByID,
  updateUserProfileByID,
};

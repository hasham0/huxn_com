import asyncHandler from "../helpers/asyncHanlder.js";
import User from "../models/user.model.js";

//note: ALL USERS_
const allUsers = asyncHandler(async (request, response) => {
  const isUsersExist = await User.find({}).select("-password");

  /* check users if existed */
  if (!isUsersExist) {
    throw {
      statusCode: 401,
      message: "users not found",
    };
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
  const isUserExist = await User.findById({ _id }).select("-password");

  if (!isUserExist) {
    throw {
      statusCode: 401,
      message: "users not found",
    };
  }

  /* send responce */
  response.json({
    data: isUserExist,
  });
});

//note: UPDATE USER ROLE_
const updateUserRoleByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const { isAdmin } = request.body;

  /* check user if existed */
  const isUserExists = await User.findById({ _id }).select("-password");

  if (!isUserExists) {
    throw {
      statusCode: 401,
      message: "user not found",
    };
  }

  /* check validation */
  if ([isAdmin].every((item) => item.trim() === "")) {
    throw {
      message: "please fill the password",
    };
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
  ).select("-password");

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
    throw {
      statusCode: 401,
      message: "user not found",
    };
  }

  /* check user if he is an admin */
  if (isUserExists.isAdmin) {
    throw {
      statusCode: 401,
      message: "can not delete admin",
    };
  }

  /* delete user */
  const deleteUser = await User.findByIdAndDelete({ _id });

  /* send responce */
  response.status(200).json({
    message: "user delete successfully",
  });
});

// !EXPORT CONTROLLERS_
export { allUsers, getUserByID, updateUserRoleByID, deleteUserByID };

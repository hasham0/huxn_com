import { ACCESS_TOKEN } from "../constant.js";
import asyncHandler from "../helpers/asyncHanlder.js";
import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/generateTokens.js";

// ? Authenticated User_
const isUserAuthenticated = asyncHandler(async (request, response, next) => {
  const getAccessToken =
    request.cookies[ACCESS_TOKEN] ||
    (request.headers.cookie &&
      request.headers.cookie.split("; ")[0].split("=")[1]) ||
    request.headers.authorization.split(" ")[1];

  if (!getAccessToken) {
    throw new Error("please login to access");
  }

  const decoded = await verifyAccessToken(getAccessToken);
  if (!decoded) {
    throw new Error("not authorize, access token fail");
  }
  request.userId = decoded._id;
  next();
});

// ? Authorize Admin_
const isUserAuthorizeAdmin = asyncHandler(async (request, response, next) => {
  const { userId } = request;
  const user = await User.findOne({ _id: userId }).select({ password: 0 });
  if (!(user && user.isAdmin)) {
    throw new Error("user not authorize as admin");
  }
  next();
});
export { isUserAuthenticated, isUserAuthorizeAdmin };

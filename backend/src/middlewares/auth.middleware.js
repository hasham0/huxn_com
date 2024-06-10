import { ACCESS_TOKEN } from "../constant.js";
import asyncHandler from "../helpers/asyncHanlder.js";
import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/generateTokens.js";

//note: Authenticated User_
const isUserAuthenticated = asyncHandler(async (request, response, next) => {
  try {
    const getAccessToken =
      request.cookies[ACCESS_TOKEN] ||
      (request.headers.cookie &&
        request.headers.cookie.split("; ")[0].split("=")[1]) ||
      request.headers.authorization.split(" ")[1];

    if (!getAccessToken) {
      throw new Error("please login to access");
    }

    const decoded = verifyAccessToken(getAccessToken);
    if (!decoded) {
      throw new Error("not authorize, access token fail");
    }
    request.userId = decoded._id;
    next();
  } catch (error) {
    next(error);
  }
});

//note: Authorize Admin_
const isUserAuthorizeAdmin = asyncHandler(async (request, response, next) => {
  try {
    const { userId } = request;
    const user = await User.findOne({ _id: userId });

    if (!(user && user?.isAdmin)) {
      throw new Error("invalid request, user is not authorize as admin");
    }
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
});
export { isUserAuthenticated, isUserAuthorizeAdmin };

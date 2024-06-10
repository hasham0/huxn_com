import asyncHandler from "../helpers/asyncHanlder.js";
import { isValidObjectId } from "mongoose";

const checkID = asyncHandler((request, response, next) => {
  try {
    if (!isValidObjectId(request.params._id)) {
      throw new Error(`Invalid Object  of ${request.params._id} `);
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default checkID;

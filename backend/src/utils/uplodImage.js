import asyncHandler from "../helpers/asyncHanlder.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary, updateOnCloudinary } from "./cloudinary.js";

const uploadImageMethod = asyncHandler(async (request, response, next) => {
  try {
    const imgPath = request.file.path;
    if (!imgPath) {
      throw new Error("error while uploading image");
    }

    const cloudImg = await uploadOnCloudinary(imgPath);
    if (!cloudImg.url) {
      throw new Error("error while updating avatar");
    }
    const imgObj = {
      originalFilename: cloudImg.original_filename,
      secureUrl: cloudImg.secure_url,
      imgUrl: cloudImg.url,
    };
    response.status(200).send({
      message: "Image uploaded successfully",
      imageUrl: imgObj,
    });
  } catch (error) {
    next(error);
  }
});

const updateProductImageMethod = asyncHandler(
  async (request, response, next) => {
    try {
      const userID = request.userId;
      const imgPath = request.file.path;
      if (!imgPath) {
        throw new Error("error while uploading image");
      }
      const removeimage = await Product.findByIdAndUpdate();

      const cloudImg = await uploadOnCloudinary(imgPath);
      if (!cloudImg.url) {
        throw new Error("error while updating avatar");
      }
      const imgObj = {
        originalFilename: cloudImg.original_filename,
        secureUrl: cloudImg.secure_url,
        imgUrl: cloudImg.url,
      };
      response.status(200).send({
        message: "Image uploaded successfully",
        imageUrl: imgObj,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { uploadImageMethod, updateProductImageMethod };

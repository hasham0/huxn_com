import asyncHandler from "../helpers/asyncHanlder.js";
import Product from "../models/product.model.js";
import uploadOnCloudinary from "./cloudinary.js";

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
    response.status(200).send({
      message: "Image uploaded successfully",
      imageUrl: cloudImg.url,
    });
  } catch (error) {
    next(error);
  }
});

export default uploadImageMethod;

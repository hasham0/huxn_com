import path from "path";
import asyncHandler from "../helpers/asyncHanlder.js";
import Product from "../models/product.model.js";
import {
  uploadOnCloudinary,
  updateOnCloudinary,
} from "../services/cloudinary.js";

const uploadImageMethod = asyncHandler(async (request, response, next) => {
  try {
    const imgPath = request.file;
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
      const { prodID } = request.params;
      const imgPath = request.file;
      if (!imgPath) {
        throw new Error("error while uploading image");
      }

      const productImage = await Product.findOne({ _id: prodID });
      if (!imgPath) {
        throw new Error("error while uploading image");
      }

      const oldPublicId = `${productImage.image
        .split("/")
        .at(-2)}/${productImage.image.split("/").at(-1)}`.split(".")[0];

      const newCloudImg = await updateOnCloudinary(imgPath, oldPublicId);
      await Product.findByIdAndUpdate(
        {
          _id: prodID,
        },
        {
          $set: {
            image: newCloudImg.secure_url,
          },
        },
        {
          new: true,
        }
      );
      response.status(200).send({
        newImgUrl: newCloudImg.secure_url,
        message: "Image updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export { uploadImageMethod, updateProductImageMethod };

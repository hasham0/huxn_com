import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw {
        message: "local file path not found",
      };
    }
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "huxn-web-ecommerce",
    });
    fs.unlinkSync(localFilePath); //! remove local save file when success to upload
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath); //! remove local save file when fail to upload
    return null;
  }
};

const updateOnCloudinary = async (localFilePath, newLocalFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path not found");
    }

    const destroyCloudImg = await cloudinary.uploader.destroy(localFilePath, {
      resource_type: "image",
      folder: "huxn-web-ecommerce",
    });

    const uploadResult = await cloudinary.uploader.upload(newLocalFilePath, {
      resource_type: "auto",
      folder: "huxn-web-ecommerce",
    });

    fs.unlinkSync(newLocalFilePath); //! remove local save file when success to upload
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(newLocalFilePath); //! remove local saved file when fail to upload
    return null;
  }
};

export { uploadOnCloudinary, updateOnCloudinary };

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePathName = (file) =>
  path.resolve(__dirname, "../../public/temp/", file.filename);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || !localFilePath.filename) {
      throw new Error("Local file path or filename not found");
    }
    const filePath = filePathName(localFilePath);
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: localFilePath.filename,
      resource_type: "image",
      folder: "huxn-web-ecommerce",
      format: localFilePath.mimetype.split("/")[1], // Extract file extension from mimetype
    });

    fs.unlinkSync(filePath); // Remove the local file after successful upload
    return uploadResult;
  } catch (error) {
    console.error("Upload failed:", error.message);
    const filePath = filePathName(localFilePath);
    fs.unlinkSync(filePath);
    return null;
  }
};

const updateOnCloudinary = async (localFilePath, pubicId) => {
  try {
    if (!localFilePath || !localFilePath.filename) {
      throw new Error("Local file path or filename not found");
    }
    const filePath = filePathName(localFilePath);
    await cloudinary.uploader.destroy(pubicId);
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: localFilePath.filename,
      resource_type: "image",
      folder: "huxn-web-ecommerce",
      format: localFilePath.mimetype.split("/")[1], // Extract file extension from mimetype
    });
    fs.unlinkSync(filePath); // Remove the local file after successful upload
    return uploadResult;
  } catch (error) {
    console.error("Upload failed:", error.message);
    const filePath = filePathName(localFilePath);
    fs.unlinkSync(filePath);
    return null;
  }
};

export { uploadOnCloudinary, updateOnCloudinary };

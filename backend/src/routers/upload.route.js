import { Router } from "express";
import { upload } from "../utils/multer.js";
import asyncHandler from "../helpers/asyncHanlder.js";

// set variable
const router = Router();

router.route("/").post(
  upload.single("image"),
  asyncHandler((request, response, next) => {
    try {
      const imgPath = request.file.path;
      if (!imgPath) {
        throw new Error("error while uploading image");
      }
      response.status(200).send({
        message: "Image uploaded successfully",
        image: `/${request.file.path}`,
      });
    } catch (error) {
      next(error);
    }
  })
);

//! export route_

export default router;

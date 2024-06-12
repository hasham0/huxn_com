import { Router } from "express";
import { upload } from "../utils/multer.js";
import uploadImageMethod from "../utils/uplodImage.js";
import {
  isUserAuthenticated,
  isUserAuthorizeAdmin,
} from "../middlewares/auth.middleware.js";

// set variable
const router = Router();

router
  .route("/")
  .post(
    isUserAuthenticated,
    isUserAuthorizeAdmin,
    upload.single("image"),
    uploadImageMethod
  );

//! export route_

export default router;

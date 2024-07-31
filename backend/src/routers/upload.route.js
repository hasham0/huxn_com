import { Router } from "express";
import { upload } from "../utils/multer.js";
import {
  uploadImageMethod,
  updateProductImageMethod,
} from "../utils/uplodImage.js";
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

router
  .route("/updateProductImage/:prodID")
  .patch(
    isUserAuthenticated,
    isUserAuthorizeAdmin,
    upload.single("image"),
    updateProductImageMethod
  );

//! export route_

export default router;

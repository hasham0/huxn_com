import formidable from "express-formidable";
import { Router } from "express";
import {
  isUserAuthenticated,
  isUserAuthorizeAdmin,
} from "../middlewares/auth.middleware.js";
import checkID from "../middlewares/checkID.middleware.js";
import {
  deleteProductByID,
  addNewProduct,
  fetchLimitedProducts,
  updateProductDetailsByID,
  getProductByID,
  getAllProducts,
  addProductReviewByID,
  topProducts,
  newProducts,
} from "../controllers/product.controller.js";

// set variable
const router = Router();

router.route("/allProducts").get(getAllProducts);

router.route("/limitedProducts").get(fetchLimitedProducts);

router
  .route("/singleProduct/:_id")
  .get(isUserAuthenticated, isUserAuthorizeAdmin, getProductByID);

router.route("/topProducts").get(topProducts);

router.route("/newProducts").get(newProducts);

router
  .route("/productReview/:_id/reviews")
  .post(isUserAuthenticated, isUserAuthorizeAdmin, addProductReviewByID);

router
  .route("/addNewProduct")
  .post(isUserAuthenticated, isUserAuthorizeAdmin, formidable(), addNewProduct);

router
  .route("/updateProduct/:_id")
  .patch(
    isUserAuthenticated,
    isUserAuthorizeAdmin,
    formidable(),
    updateProductDetailsByID
  );

router
  .route("/deleteProduct/:_id")
  .delete(isUserAuthenticated, isUserAuthorizeAdmin, deleteProductByID);

export default router;

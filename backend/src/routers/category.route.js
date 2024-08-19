import { Router } from "express";
import {
  isUserAuthenticated,
  isUserAuthorizeAdmin,
} from "../middlewares/auth.middleware.js";
import {
  allCategories,
  createCategory,
  updateCategoryByID,
  deleteCategoryByID,
  categoryByID,
} from "../controllers/category.controller.js";

// set variable
const router = Router();

router.route("/allCategories").get(allCategories);

router
  .route("/onlyCategory/:_id")
  .get([isUserAuthenticated, isUserAuthorizeAdmin], categoryByID);

router
  .route("/newCategoryItem")
  .post([isUserAuthenticated, isUserAuthorizeAdmin], createCategory);

router
  .route("/updateCategoryItem/:_id")
  .put([isUserAuthenticated, isUserAuthorizeAdmin], updateCategoryByID);

router
  .route("/deleteCategoryItem/:_id")
  .delete([isUserAuthenticated, isUserAuthorizeAdmin], deleteCategoryByID);

export default router;

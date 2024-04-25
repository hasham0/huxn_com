import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  updatePassword,
  updateProfile,
  userProfile,
} from "../controllers/user.controller.js";
import {
  allUsers,
  deleteUserByID,
  getUserByID,
  updateUserRoleByID,
} from "../controllers/admin.controller.js";
import {
  isUserAuthenticated,
  isUserAuthorizeAdmin,
} from "../middlewares/auth.middleware.js";

// set variable
const router = Router();

// user routes
router.route("/registerUser").post(createUser);
router.route("/auth/loginUser").post(loginUser);
router.route("/auth/profile").get(isUserAuthenticated, userProfile);
router.route("/auth/updateProfile").put(isUserAuthenticated, updateProfile);
router.route("/auth/updatePassword").put(isUserAuthenticated, updatePassword);
router.route("/auth/logoutUser").post(isUserAuthenticated, logoutUser);
router.route("/auth/deleteUser").delete(isUserAuthenticated, deleteUser);

// admin routes
router
  .route("/allUsers")
  .get(isUserAuthenticated, isUserAuthorizeAdmin, allUsers);
router
  .route("/userProfile/:_id")
  .get(isUserAuthenticated, isUserAuthorizeAdmin, getUserByID);
router
  .route("/updateRole/:_id")
  .put(isUserAuthenticated, isUserAuthorizeAdmin, updateUserRoleByID);

router
  .route("/userDelete/:_id")
  .delete(isUserAuthenticated, isUserAuthorizeAdmin, deleteUserByID);

//! export route_
export default router;

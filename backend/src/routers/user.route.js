import { Router } from "express";
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
  updateUserProfileByID,
  updateUserRoleByID,
} from "../controllers/admin.controller.js";
import {
  isUserAuthenticated,
  isUserAuthorizeAdmin,
} from "../middlewares/auth.middleware.js";

// set variable
const router = Router();

//note: user routes and rights_
router.route("/registerUser").post(createUser);

router.route("/auth/loginUser").post(loginUser);

router.route("/auth/profile").get(isUserAuthenticated, userProfile);

router.route("/auth/updateProfile").put(isUserAuthenticated, updateProfile);

router.route("/auth/updatePassword").put(isUserAuthenticated, updatePassword);

router.route("/auth/logoutUser").post(isUserAuthenticated, logoutUser);

router.route("/auth/deleteUser").delete(isUserAuthenticated, deleteUser);

//note: admin routes and rights_
router
  .route("/allUsers")
  .get(isUserAuthenticated, isUserAuthorizeAdmin, allUsers);

router
  .route("/userDetails/:_id")
  .get(isUserAuthenticated, isUserAuthorizeAdmin, getUserByID);

router
  .route("/updateProfile/:_id")
  .put(isUserAuthenticated, isUserAuthorizeAdmin, updateUserProfileByID);

router
  .route("/updateRole/:_id")
  .put(isUserAuthenticated, isUserAuthorizeAdmin, updateUserRoleByID);

router
  .route("/userDelete/:_id")
  .delete(isUserAuthenticated, isUserAuthorizeAdmin, deleteUserByID);

//! export route_
export default router;

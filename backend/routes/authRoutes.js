import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

export default router;

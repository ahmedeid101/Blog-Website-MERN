const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteUserProfile,
  uploadProfilePhoto,
  deleteAnyProfile,
  getAllUsers,
  getAnyProfile,
  getTotalUsers,
} = require("../DependencyInjection/UserInjection");
const authMiddleware = require("../Middlewares/authMiddleware");
const validateObjectId = require("../Middlewares/validateObjectId");
const uploadPhoto = require('../Middlewares/photoUpload');
const UpdateProfileValidator = require("../Validations/user.validators");


const router = express.Router();

// User routes
router.get("/profile/:id", validateObjectId, getProfile);
router.put("/profile/:id", authMiddleware(["admin", "user"]), UpdateProfileValidator.validateUpdateProfile, validateObjectId, updateProfile);
router.delete("/profile/:id", authMiddleware(), validateObjectId, deleteUserProfile);
router.post('/profile/upload-photo', authMiddleware(), uploadPhoto, uploadProfilePhoto);

// Admin-only routes
router.get("/profiles", authMiddleware(["admin"]), getAllUsers);
router.get("/user/:id", validateObjectId, authMiddleware(["admin"]), getAnyProfile);
router.get("/count", authMiddleware(["admin"]), getTotalUsers);
router.delete("/user/:id", validateObjectId, authMiddleware(["admin"]), deleteAnyProfile);

module.exports = router;

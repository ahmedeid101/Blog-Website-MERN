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
<<<<<<< HEAD
router.put("/profile/:id", authMiddleware(), UpdateProfileValidator.validateUpdateProfile, validateObjectId, updateProfile);
=======
router.put("/profile/:id", authMiddleware(['user']), UpdateProfileValidator.validateUpdateProfile, validateObjectId, updateProfile);
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
router.delete("/profile/:id", authMiddleware(), validateObjectId, deleteUserProfile);
router.post('/profile/upload-photo', authMiddleware(), uploadPhoto, uploadProfilePhoto);

// Admin-only routes
<<<<<<< HEAD
router.get("/profiles", authMiddleware(["admin"]), getAllUsers);
=======
router.get("/all", authMiddleware(["admin"]), getAllUsers);
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
router.get("/user/:id", validateObjectId, authMiddleware(["admin"]), getAnyProfile);
router.get("/count", authMiddleware(["admin"]), getTotalUsers);
router.delete("/user/:id", validateObjectId, authMiddleware(["admin"]), deleteAnyProfile);

module.exports = router;

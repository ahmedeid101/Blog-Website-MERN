const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const ErrorResponse = require("../Utils/errorResponse");

class UserController {
  constructor(userService, updateProfileValidator) {
    this.userService = userService;
    this.updateProfileValidator = updateProfileValidator;
  }


    getProfile = asyncHandler(async (req, res) => {
      try {
          const user = await this.userService.getProfile(req.params.id);
          res.status(200).json(user);
        
      } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
        //res.status(400).json({ success: false, error: error.message});
      }
  });

  updateProfile = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await this.userService.updateProfile(
      req.user.id,  // From auth middleware
      req.body      // Update data
    );

    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
  });

  deleteUserProfile = asyncHandler(async (req, res) => {
  await this.userService.deleteUserProfile(req.params.id, req.user);
  res.status(200).json({ success: true, message: "User profile deleted successfully" });
});

    uploadProfilePhoto = asyncHandler(async (req, res) => {
      try {
      // Debug: Log the uploaded file
      console.log('Uploaded file:', {
        originalname: req.file?.originalname,
        mimetype: req.file?.mimetype,
        size: req.file?.size
      });

      if (!req.file) throw new ErrorResponse('No file uploaded or Multer failed to process it', 401);

      // Delete old photo if exists
      const user = await this.userService.getProfile(req.user.id,);
      // if (!user) {
      // throw new ErrorResponse('User not found', 404);
      // }
      if (user.profilePhoto?.publicId) {
        await this.userService.deleteProfilePhoto(user.profilePhoto.publicId);
      }

      // Upload new photo
      const updatedUser = await this.userService.uploadProfilePhoto(
       req.user._id,
        req.file
      );

      res.status(200).json({success: true, data: updatedUser});

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await this.userService.getAllProfiles();
    res.status(200).json({
      success: true,
      data: users,
    });
  });

    getAnyProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.getProfile(req.params.id);
    res.status(200).json({
      success: true,
      data: user
    });
  });

  deleteAnyProfile = asyncHandler(async (req, res) => {
      const user = await this.userService.getProfile(req.params.id);
      if (!user) {
        res.status(404).json({message: 'user not found'})
      }
    //delete photo
    await this.userService.deleteProfilePhoto(user.profilePhoto.publicId);
    await this.userService.deleteProfile(req.params.id);
    res.status(201).json({
      success: true,
      message: "Admin Delete User Successfully",
    });
  });

  getTotalUsers = asyncHandler(async(req, res) => {
    try {
      const count = await this.userService.getTotalUsers(req.query.role);
      res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to count users"
      });
    }
  });
}

module.exports = UserController;

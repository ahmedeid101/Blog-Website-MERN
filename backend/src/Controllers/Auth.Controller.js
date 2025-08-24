const asyncHandler = require("express-async-handler");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = asyncHandler(async (req, res) => {
    try {
      const { user, token } = await this.authService.register(req.body);
      res.status(201).json({
        message: "User registered. Please check your email to verify.",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
        },
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  verifyEmail = asyncHandler(async (req, res) => {
    try {
      const { userId, token } = req.params;
      const { user, message } = await this.authService.verifyEmail(
        userId,
        token
      );
      res.json({ message, user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  //login user
  login = asyncHandler(async (req, res) => {
    try {
      const { user, token } = await this.authService.login(req.body);
      res.status(200).json({ ...user, token });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  sendResetPasswordEmail = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      const { message } = await this.authService.sendResetPasswordEmail(email);
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  getResetPasswordLink = asyncHandler(async (req, res) => {
    try {
      const { userId, token } = req.params;
      const { message } = await this.authService.validateResetPasswordLink(
        userId,
        token
      );
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  resetPassword = asyncHandler(async (req, res) => {
    try {
      const { userId, token } = req.params;
      const { password } = req.body;
      const { message } = await this.authService.resetPassword(
        userId,
        token,
        password
      );
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  verify = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const decoded = await this.authService.verifyToken(token);
      res.status(200).json({ isValid: true, user: decoded });
    } catch (error) {
      res.status(401).json({ isValid: false, error: error.message });
    }
  });
}

module.exports = AuthController;

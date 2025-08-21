const asyncHandler = require("express-async-handler");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // register = asyncHandler(async (req, res) => {
  //   try {
  //     const user = await this.authService.register(req.body);
  //     res
  //       .status(201)
  //       .json({ message: "User Regiesterd Successfully", User: user });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // });

  register = asyncHandler(async(req, res) => {
    try {
      const user = await this.userService.registerUser(req.body);
      res.status(201).json({
        message: "User registered. Please check your email to verify.",
        User: user
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  verifyEmail = asyncHandler(async(req, res) => {
    try {
      const user = await this.userService.verifyEmail(req.params.token);
      res.json({ message: "Email verified successfully", user });
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
      res.status(400).json({success: false, error: error.message });
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

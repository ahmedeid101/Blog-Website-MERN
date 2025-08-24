// Auth Service (Refactored)
const crypto = require("crypto");
const ErrorResponse = require("../Utils/errorResponse");
const VerificationToken = require("../Models/VerificationToken");
const User = require("../Models/User");

class AuthService {
  constructor(userRepository, passwordHasher, jwtService, emailService) {
    if (!jwtService?.generateToken) {
      throw new ErrorResponse("Valid JWT service must be provided", 401);
    }
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jwtService = jwtService;
    this.emailService = emailService;
  }

  async register({ email, password, ...rest }) {
    if (await this.userRepository.findByEmail(email)) {
      throw new ErrorResponse("Email already registered", 401);
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const user = await this.userRepository.create({ ...rest, email, password: hashedPassword });

    await this.emailService.sendTokenEmail(user, "verify");
    return { user };
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ErrorResponse("Invalid Email", 401);

    if (!user.isAccountVerified) {
      await this.emailService.sendTokenEmail(user, "verify");
      throw new ErrorResponse("Verification email sent. Please check your inbox.");
    }

    if (!(await this.passwordHasher.compare(password, user.password))) {
      throw new ErrorResponse("Invalid Password", 401);
    }

    const token = this.jwtService.generateToken({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    const { _id, username, isAdmin, isAccountVerified, profilePhoto } = user;
    return { user: { _id, username, isAdmin, isAccountVerified, profilePhoto }, token };
  }

  verifyToken(token) {
    return this.jwtService.verifyToken(token);
  }

  async verifyEmail(userId, token) {
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse("User not found", 404);

    const foundToken = await this.emailService.findToken(token, "reset");
    if (!foundToken) throw new ErrorResponse("Invalid or expired verify token");

    user.isAccountVerified = true;
    await user.save();
    await this.emailService.deleteToken(token)

    return { user, message: "Email verified successfully, you can now log in" };
  }

  // Send reset password email
  async sendResetPasswordEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ErrorResponse("User not found");

    await this.emailService.sendTokenEmail(user, "reset");
    return { message: "Password reset link sent to your email, Please check your inbox" };
  }

  async validateResetPasswordLink(userId, token) {
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse("Invalid link", 400);

    const verificationToken = await this.emailService.findToken(token, "reset");
    if (!verificationToken) throw new ErrorResponse("Invalid link", 400);

    return { message: "Valid url" };
  }

  // Reset password
  async resetPassword(userId, token, newPassword) {
    const foundToken = await this.emailService.findToken(token, "reset");
    if (!foundToken) throw new ErrorResponse("Invalid or expired reset token");

    // validate userId matches the token's user
    if (foundToken.userId.toString() !== userId.toString()) {
      throw new ErrorResponse("Invalid Id");
    }

    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse("User not found");

    user.password = await this.passwordHasher.hash(newPassword);
    await user.save();

    await this.emailService.deleteToken(token);
    return { message: "Password reset successful" };
  }
}

module.exports = AuthService;

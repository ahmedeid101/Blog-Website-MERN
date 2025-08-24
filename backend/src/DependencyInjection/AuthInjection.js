const User = require('../Models/User');
const AuthRepository = require('../Repositories/auth.repository');
const BcryptStrategy = require('../Strategies/bcrypt.strategy');
const AuthService = require('../Services/auth.service');
const AuthController = require('../Controllers/Auth.Controller');
const JWT = require('../Utils/jwt');
const VerificationToken = require("../Models/VerificationToken");
const EmailService = require("../Services/email.service");

// Initialize JWT service
const jwtService = new JWT(); 

// Setup dependencies
const authRepository = new AuthRepository(User);
const passwordStrategy = new BcryptStrategy();
//const verificationToken = new VerificationToken;
const emailService = new EmailService(VerificationToken);
const authService = new AuthService(authRepository, passwordStrategy, jwtService, emailService);
// Create controller
const authController = new AuthController(authService);

module.exports = {
  register: authController.register,
  login: authController.login,
  verifyEmail: authController.verifyEmail,
  sendResetPasswordEmail: authController.sendResetPasswordEmail,
  getResetPasswordLink: authController.getResetPasswordLink,
  resetPassword: authController.resetPassword,
};

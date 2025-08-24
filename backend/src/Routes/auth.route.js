const express = require("express");
const {register, login, verifyEmail, sendResetPasswordEmail, getResetPasswordLink, resetPassword} = require('../DependencyInjection/AuthInjection');
const RegisterValidator = require("../Validations/register.validator");
const LoginValidator = require("../Validations/login.validator");
const ResetPasswordValidator = require("../Validations/resetPassword.validator");
const router = express.Router();

router.post('/register', RegisterValidator.validateRegister, register);
router.post('/login', LoginValidator.validateLogin, login);
router.get('/:userId/verify/:token', verifyEmail);
// Request reset password email
router.post("/forgot-password", ResetPasswordValidator.validateUserEmail, sendResetPasswordEmail);
// GET reset password link validation
router.get("/reset-password/:userId/:token", getResetPasswordLink);
// Reset password
router.post("/reset-password/:userId/:token", ResetPasswordValidator.validateResetPasswors, resetPassword);

module.exports = router;
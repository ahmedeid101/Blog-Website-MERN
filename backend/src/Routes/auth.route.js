const express = require("express");
const {register, login, verifyEmail} = require('../DependencyInjection/AuthInjection');
const RegisterValidator = require("../Validations/register.validator");
const LoginValidator = require("../Validations/login.validator")


const router = express.Router();

router.post('/register', RegisterValidator.validateRegister, register);
router.post('/login', LoginValidator.validateLogin, login);
router.post('/verify/:token', verifyEmail);

module.exports = router;
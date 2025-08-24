const Joi = require("joi");
const joi_password = require("joi-password-complexity");

class ResetPasswordValidator {
    static #userEmailSchema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
    });

    static #newPassordSchema = Joi.object({
        password: joi_password().required(),
    });

    static validateUserEmail = (req, res, next) => {
    const { error } = this.#userEmailSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };

    static validateResetPasswors = (req, res, next) => {
    const { error } = this.#newPassordSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

module.exports = ResetPasswordValidator;
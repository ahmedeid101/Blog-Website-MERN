const Joi = require("joi");

class LoginValidator {
  static #loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
      }),
    password: Joi.string()
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
      }),
  });

  // Middleware for validating login
  static validateLogin = (req, res, next) => {
    const { error } = this.#loginSchema.validate(req.body, {
      abortEarly: false, // collect all errors
      allowUnknown: false, // reject unknown fields
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ success: false, erorrs: errors});
    }

    next();
  };
}

module.exports = LoginValidator;




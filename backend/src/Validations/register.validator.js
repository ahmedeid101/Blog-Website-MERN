const Joi = require("joi");

class RegisterValidator {
  static #registerschema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .pattern(/^[a-zA-Z0-9_]+$/)
      .required()
      .messages({
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters",
        "string.max": "Username cannot exceed 30 characters",
        "string.pattern.base":
          "Username can only contain letters, numbers and underscores",
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters",
      "string.empty": "Password is required",
    }),
  });

  // Middleware for validating register
  static validateRegister = (req, res, next) => {
    const { error } = this.#registerschema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

module.exports = RegisterValidator;

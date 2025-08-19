// validators/user/UpdateProfileValidator.js
const Joi = require("joi");

class UpdateProfileValidator {
  // Private Joi schema for updating profile
  static #updateProfileSchema = Joi.object({
    username: Joi.string().min(2).max(100).messages({
      "string.min": "Username must be at least 2 characters",
      "string.max": "Username cannot exceed 100 characters",
    }),
    email: Joi.string().email().messages({
      "string.email": "Invalid email format",
    }),
    bio: Joi.string().max(500).messages({
      "string.max": "Bio cannot exceed 500 characters",
    }),
    profilePhoto: Joi.object({
      url: Joi.string().uri().required(),
      publicId: Joi.string().allow(null),
    }).messages({
      "object.base": "Profile photo must be an object",
    }),
  }).min(1); // Require at least one field

  // Middleware for validating profile update
  static validateUpdateProfile = (req, res, next) => {
    const { error } = this.#updateProfileSchema.validate(req.body, {
      abortEarly: false,  // Return all errors, not just the first
      allowUnknown: false // Disallow extra fields
    });

    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
}

module.exports = UpdateProfileValidator;


// // validators/user/UpdateProfileValidator.js
// const Validator = require('./Validator');
// const Joi = require('joi');

// class UpdateProfileValidator extends Validator {
//   constructor() {
//     super();
//     this.schema = Joi.object({
//       username: Joi.string().min(2).max(100).messages({
//         'string.min': 'Username must be at least 2 characters',
//         'string.max': 'Username cannot exceed 100 characters',
//       }),
//       email: Joi.string().email().messages({
//         'string.email': 'Invalid email format',
//       }),
//       bio: Joi.string().max(500).messages({
//         'string.max': 'Bio cannot exceed 500 characters',
//       }),
//       profilePhoto: Joi.object({
//         url: Joi.string().uri().required(),
//         publicId: Joi.string().allow(null),
//       }).messages({
//         'object.base': 'Profile photo must be an object',
//       }),
//     }).min(1); // At least one field required
//   }

//   async validate(data) {
//     const { error } = this.schema.validate(data, { 
//       abortEarly: false, // Return all errors, not just the first one
//       allowUnknown: false, // Reject unknown fields
//     });

//     if (error) {
//       return {
//         isValid: false,
//         errors: error.details.map((err) => err.message),
//       };
//     }

//     return super.validate(data);
//   }
// }

// module.exports = UpdateProfileValidator;

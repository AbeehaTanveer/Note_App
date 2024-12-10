const joi = require("joi");

const ValidateSignup = (req, res, next) => {
  try {
    const validateRequest = joi.object({
      Fname: joi.string().min(3).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().min(3).max(20).required(),
    });

    const { error } = validateRequest.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message, // Return the specific error message
      });
    }

    next(); // Proceed if no validation error
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const ValidateLogin = (req, res, next) => {
  try {

    const validateRequestLogin = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(3).max(20).required(),
    });

    const { error } = validateRequestLogin.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message, // Provide a clear error message
      });
    }

    next(); // Proceed if no validation error
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = { ValidateLogin, ValidateSignup };

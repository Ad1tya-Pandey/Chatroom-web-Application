const joi = require("joi");
const logger = require("../backend/config/logger");
const authSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(4).required(),
});

const registerUserSchema = joi.object({
  name: joi.string().max(10).required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(4).required(),
});
async function validator(validationSchema, req, res) {
  try {
    const result = await validationSchema.validateAsync(req.body);
    // for validation using joi
  } catch (error) {
    logger.warn(` entered invalid data format with respect to fields`);
    res.status(400).json({ error: error.message });
    return;
  }
}

module.exports = { authSchema, registerUserSchema, validator };

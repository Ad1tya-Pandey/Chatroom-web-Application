const joi = require("joi");
const authSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(4).required(),
});

const registeruser_Schema = joi.object({
  name: joi.string().max(10).required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(4).required(),
});
module.exports = { authSchema, registeruser_Schema };

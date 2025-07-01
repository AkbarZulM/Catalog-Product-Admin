import Joi from "joi";

const registerValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
  address: Joi.string().allow("", null),
  role: Joi.string().valid("admin", "user").default("user"),
});

const loginValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

export { registerValidate, loginValidate };

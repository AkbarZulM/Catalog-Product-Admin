import Joi from "joi";

const getProduct = Joi.number().positive().required();

const createProductValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
  qty: Joi.number().required(),
});

const updateProductValidation = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
  qty: Joi.number().required().min(0),
}).options({ convert: true });
export { getProduct, createProductValidation, updateProductValidation };

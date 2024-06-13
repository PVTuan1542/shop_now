import Joi, { ObjectSchema } from "joi";

export const UserRegisterDto = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  userName: Joi.string().required(),
  phone: Joi.string().min(10).max(12).optional(),
  email: Joi.string().email().optional()
})

export const UserLoginDto = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
})

export const SendOtpDto = Joi.object().keys({
  phone: Joi.string().min(10).max(12).required(),
})
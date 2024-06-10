import Joi, { ObjectSchema } from "joi";

const UserRegisterDto = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  userName: Joi.string().required(),
  phoneNumber: Joi.string().min(10).optional(),
  email: Joi.string().email().optional()
})

export default UserRegisterDto;
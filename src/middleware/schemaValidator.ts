import { RequestHandler } from "express";
import Joi, { ObjectSchema } from "joi";

interface ValidationError {
  message: string;
  type: string;
}

interface JoiError {
  status: string;
  error: {
    original: unknown;
    details: ValidationError[];
  }
}

interface CustomError {
  status: string;
  error: string;
}

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (schema: Joi.ObjectSchema<any>, useJoiError = true): RequestHandler => {

  if (!schema) {
    throw new Error(`Schema not found`);
  }

  return (req, res, next) => {

    const { error, value } = schema.validate(req.body, validationOptions);

    if(error) {
      const customError: CustomError = {
        status: "failed",
        error: "Invalid request. Please review request and try again."
      }

      console.log('error validate: ', error);

      const joiError: JoiError = {
        status: "failed",
        error: {
          original: error._original,
          details: error.details?.map(({message, type}: ValidationError) => ({
            message: message.replace(/['"]/g, ''),
            type
          }))
        }
      }

      return res.status(422).json(useJoiError ? joiError : customError);
    }

    // validation successful
    req.body = value;
    return next();
  }
}

export default schemaValidator;
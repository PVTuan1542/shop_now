import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { User } from '../entities/user';
import Joi from 'joi';
import schemaValidator from './schemaValidator';

interface UserAuth {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface IUserRequest extends Request {
  user: UserAuth
}

interface IUserResponse extends Response {
  user: UserAuth
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")?.[1];
  if(!token) {
    return res.status(401).json({message: "Authorization token is required!"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as IUserRequest).user = {
      userId: decoded.userId,
      firstName: decoded.firstName,
      lastName: decoded.lastName
    };

    return next();
  } catch (error) {
    return res.status(401).json({message: "Invalid token!"});
  }
}

export const authAndValidateDto = (schemaDto?:  Joi.ObjectSchema<any>) => {
  console.log('333333 ikkk')

  return (req: Request, res: Response, next: NextFunction) => {
    console.log('333333 ikkk')
    try {
      authenticate(req, res, (authError: any) => {
        if(authError) {
          return next(authError);
        }
        if(schemaDto) {
          schemaValidator(schemaDto)(req, res, next);
        }
      })
      return next();
    } catch (error) {
      console.log(error)
    }
  }
}
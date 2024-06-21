import { Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { TwilioService } from '../../services/twilioService';
import { IUserRequest } from '../../middleware/authenticate';

const userService = new UserService();
const twilioService = new TwilioService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await userService.getUser();
    console.log('000000',(req as IUserRequest).user)

    if(!response.error) {
      res.status(201).json({
        data: response.data, 
        pagination: response.pagination
      });
    } else {
      res.status(response.status || 400).json(response.error);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    const response = await userService.registerUser({...newUser, isWork: true});
   
    if(!response.error) {
      res.status(201).json(response.data);
    } else {
      res.status(response.status || 400).json(response.error);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const {userName, password} = req.body;
  try {
    const response = await userService.login({
      userName,
      password
    });
   
    if(!response.error) {
      res.status(201).json(response.data);
    } else {
      res.status(response.status || 400).json(response.error);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error login user' });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const { phone } = req.body;
  try {
    const response = await userService.getOneByPhone(phone)

    if(response.error) {
      res.status(response.status || 400).json(response.error);
      return
    }

    const otp = await twilioService.sendOTP(phone) 

    if(otp.success) {
      res.status(201).json({ success: true });
    } else {
      res.status(response.status || 400).json(otp.error);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error send otp' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { phone, code } = req.body;
  try {
    const response = await twilioService.verifyOTP(phone, code)

    if(response.success) {
      res.status(201).json({success: response.success});
    } else {
      res.status(response.status || 400).json(response.error);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error  verify otp' });
  }
};
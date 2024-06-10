import { Connection } from 'mysql2/promise';
import { Request, Response } from 'express';
import { User } from '../../entities/user';
import { UserService } from '../../services/userService';
import { UserRegister } from './user.interface';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await userService.getUser();

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
    const response = await userService.registerUser(newUser);
   
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
    res.status(500).json({ error: 'Error creating user' });
  }
};

import { Connection } from 'mysql2/promise';
import { Request, Response } from 'express';
import { User } from '../entities/user';

export const getUsers = (connection: Connection) => async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const createUser = (connection: Connection) => async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    await connection.query('INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)', [
      user.firstName,
      user.lastName,
      user.email
    ]);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

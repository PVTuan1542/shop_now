import { Router } from 'express';
import { Connection } from 'mysql2/promise';
import { getUsers, createUser } from '../controllers/userController';

const userRoutes = (connection: Connection) => {
  const router = Router();

  router.get('/', getUsers(connection));
  router.post('/', createUser(connection));

  return router;
};

export default userRoutes;

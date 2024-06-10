import { Router } from 'express';
import { Connection } from 'mysql2/promise';
import { getUsers, registerUser } from '../controllers/user/user.controller';

const router = Router();

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', registerUser);


export default router;

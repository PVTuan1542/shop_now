import { Router } from 'express';
import { Connection } from 'mysql2/promise';
import { getUsers, registerUser } from '../controllers/user/user.controller';
import schemaValidator from '../middleware/schemaValidator';
import UserRegisterDto from '../controllers/user/user.dto';

const router = Router();

router.get('/', getUsers);
router.post('/register',schemaValidator(UserRegisterDto),  registerUser);
router.post('/login', registerUser);


export default router;

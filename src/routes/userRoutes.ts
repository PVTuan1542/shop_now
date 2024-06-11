import { Router } from 'express';
import { getUsers, login, registerUser } from '../controllers/user/user.controller';
import schemaValidator from '../middleware/schemaValidator';
import { UserRegisterDto, UserLoginDto } from '../controllers/user/user.dto';

const router = Router();

router.get('/', getUsers);
router.post('/register',schemaValidator(UserRegisterDto),  registerUser);
router.post('/login',schemaValidator(UserLoginDto) , login);


export default router;

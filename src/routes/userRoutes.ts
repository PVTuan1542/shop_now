import { Router } from 'express';
import { getUsers, login, registerUser, sendOtp } from '../controllers/user/user.controller';
import schemaValidator from '../middleware/schemaValidator';
import { UserRegisterDto, UserLoginDto, SendOtpDto } from '../controllers/user/user.dto';

const router = Router();

router.get('/', getUsers);
router.post('/register',schemaValidator(UserRegisterDto),  registerUser);
router.post('/login',schemaValidator(UserLoginDto) , login);
router.post('/otp',schemaValidator(SendOtpDto) , sendOtp);


export default router;

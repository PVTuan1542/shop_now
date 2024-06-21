import { Router } from 'express';
import { getUsers, login, registerUser, sendOtp, verifyOtp } from '../controllers/user/user.controller';
import schemaValidator from '../middleware/schemaValidator';
import { UserRegisterDto, UserLoginDto, SendOtpDto, VerifyOtpDto } from '../controllers/user/user.dto';
import { authAndValidateDto, authenticate } from '../middleware/authenticate';

const router = Router();

router.get('/users', getUsers);
router.post('/register', schemaValidator(UserRegisterDto),  registerUser);
router.post('/login', schemaValidator(UserLoginDto), login);
router.post('/otp', schemaValidator(SendOtpDto), sendOtp);
router.post('/verify_otp', schemaValidator(VerifyOtpDto), verifyOtp);

export default router;

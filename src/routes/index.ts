import { Router } from 'express';
import { Connection } from 'mysql2/promise';
import userRoutes from './userRoutes';
import { registerUser } from '../controllers/user/user.controller';

const router = Router();

// Mount user routes
router.use('/auth', userRoutes);

export default router;
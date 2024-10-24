import { Router } from 'express';
import { createNewUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/add-user', createNewUser);

export default router;

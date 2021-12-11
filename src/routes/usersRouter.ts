import { Router } from 'express';
import postUser from '../controllers/usersController';

const router = Router();

router.post('', postUser);

export default router;

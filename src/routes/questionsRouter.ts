import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router = Router();

router.post('', questionsController.postQuestion);
router.get('', questionsController.getQuestions);

export default router;

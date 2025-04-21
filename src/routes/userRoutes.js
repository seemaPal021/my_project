import { Router } from 'express';
const router = Router();
import { signup ,login, search} from '../controllers/userController.js';
import authMiddleware from '../middlerware/authorization.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/search',authMiddleware, search)

export default router;

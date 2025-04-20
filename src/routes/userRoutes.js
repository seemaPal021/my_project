import { Router } from 'express';
const router = Router();
import { signup ,login, search} from '../controllers/userController.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/search',search)

export default router;

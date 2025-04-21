import { Router } from 'express';
const router = Router();
import { signup ,login, search, deleteUser} from '../controllers/userController.js';
import authMiddleware from '../middlerware/authorization.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/search',authMiddleware, search)
router.delete('/:id', authMiddleware, deleteUser)

export default router;

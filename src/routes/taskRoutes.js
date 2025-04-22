import { Router } from 'express';
const router = Router();
import {create, getAssignedTask} from '../controllers/taskController.js';
import authMiddleware from '../middlerware/authorization.js';

router.post('/task', authMiddleware, create)
router.get('/:assignedTo', authMiddleware, getAssignedTask)

export default router;

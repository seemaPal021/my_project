import { Router } from 'express';
const router = Router();
import {create, deleteTask, getAssignedTask, updateTask} from '../controllers/taskController.js';
import authMiddleware from '../middlerware/authorization.js';

router.post('/', authMiddleware, create)
router.get('/:assignedTo', authMiddleware, getAssignedTask)
router.delete('/:id', authMiddleware, deleteTask)
router.put('/:id',authMiddleware,updateTask)
export default router;

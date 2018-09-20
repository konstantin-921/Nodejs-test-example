import express from 'express';
import { getTasks, addTask, deleteTask } from '../controller/tasks';

const router = express.Router();

router.get('/api/tasks/:columnId', getTasks);

router.post('/api/tasks', addTask);

router.delete('/api/tasks/:id', deleteTask);

export default router;

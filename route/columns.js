import express from 'express';
import { getColumns, addColumn, deleteColumn } from '../controller/columns';

const router = express.Router();

router.get('/api/columns/:boardId', getColumns);

router.post('/api/columns', addColumn);

router.delete('/api/columns/:id', deleteColumn);

export default router;

import express from 'express';
import {
  getOneBoard,
  getBoards,
  addBoard,
  deleteBoard
} from '../controller/boards';

const router = express.Router();

router.get('/api/boards', getBoards);

router.get('/api/boards/:id', getOneBoard);

router.post('/api/boards', addBoard);

router.delete('/api/boards/:id', deleteBoard);

export default router;

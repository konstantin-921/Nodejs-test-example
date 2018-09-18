import express from "express";
import { getBoards, addBoard } from "../controller/boards";

const router = express.Router();

router.get("/api/boards", getBoards);

router.post("/api/boards", addBoard);

export default router;

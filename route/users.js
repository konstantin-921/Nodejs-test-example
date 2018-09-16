import express from "express";
import { allUsers, oneUser } from "../controller/users";

const router = express.Router();

router.get("/api/user", allUsers);

router.get("/api/user/:id", oneUser);

export default router;

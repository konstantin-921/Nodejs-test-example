import express from "express";
import { allUsers, oneUser } from "../controller/users";

const router = express.Router();

// router.get("/api/user", allUsers);

router.get("/api/user", oneUser);

export default router;

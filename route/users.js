import express from "express";
import { allUsers, oneUser } from "../controller/users";

const router = express.Router();

router.get("/api/users", allUsers);

router.get("/api/users/currentUser", oneUser);

export default router;

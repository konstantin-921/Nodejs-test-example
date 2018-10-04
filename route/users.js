import express from "express";
import { getAllUsers, getUser, updateLanguage } from "../controller/users";

const router = express.Router();

router.get("/api/users", getAllUsers);

router.get("/api/users/currentUser", getUser);

router.patch("/api/users/currentUser", updateLanguage);

export default router;

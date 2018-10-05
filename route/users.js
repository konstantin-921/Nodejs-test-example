import express from "express";
import passport from "passport";
import { getAllUsers, getUser, updateLanguage } from "../controller/users";

const router = express.Router();

router.get("/api/users", getAllUsers);

router.get("/api/users/currentUser", passport.authenticate('jwt', { session: false }), getUser);

router.patch("/api/users/currentUser", passport.authenticate('jwt', { session: false }), updateLanguage);

export default router;

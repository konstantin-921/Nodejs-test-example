import express from "express";
import passport from "passport";
import { login, addUser, secret } from "../controller/auth";

const router = express.Router();

router.post("/api/auth", addUser);

router.get("/api/auth", login);

router.post(
  "/api/auth/secret",
  passport.authenticate("jwt", { session: false }),
  secret
);

export default router;

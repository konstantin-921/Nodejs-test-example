import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { login, addUser, secret } from "../controller/auth";
import localStrategy from '../services/strategy';

const router = express.Router();

router.post("/api/auth/signUp", addUser);

router.get("/api/auth/signIn", (req, res, next) => {
  passport.authenticate('local', (err, user, message) => {
    console.log(message);
    
    res.send({message})
  })(req, res, next);
})


export default router;

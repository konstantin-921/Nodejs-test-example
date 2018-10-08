import express from "express";
import passport from "passport";
import addUser from "../controller/auth";

const router = express.Router();

router.post("/api/auth/signUp", addUser);

router.get("/api/auth/signIn", (req, res, next) => {
  passport.authenticate('local', (err, user, data) => {
    const { message, token } = data;
    res.status(data.status).send({message, token});
  })(req, res, next);
})

router.get('/api/auth/facebook', (req, res, next) => {
  passport.authenticate('facebook', (err, user, data) => {
    res.status(200).send({data});
  })
});

export default router;

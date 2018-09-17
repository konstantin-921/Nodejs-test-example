import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import models from "../models/index";
import config from "../config/config";
import strategy from "../services/strategy";

function login(req, res, next) {
  models.Users.findOne({
    where: {
      login: req.query.login
    }
  })
    .then(users => {
      const user = users;
      const hash = bcrypt.compareSync(req.query.password, user.password);
      if (hash && user.login === req.query.login) {
        const payload = { user: user.id };
        const token = jwt.sign(payload, "tasmanianDevil", {
          expiresIn: "7d"
        });
        res.status(200).send({ message: "ok", token, userId: user.id });
      } else {
        res.status(401).send({ error: { message: "Password is incorrect" } });
      }
    })
    .catch(error => {
      error.status = 403;
      error.message = "This user does not exist";
      next(error);
    });
}

function addUser(req, res, next) {
  const passwordFromUser = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  req.body.password = passwordToSave;

  models.Users.findOne({
    where: { login: req.body.login }
  })
    .then(users => {
      if (!users) {
        models.Users.create({
          login: req.body.login,
          password: req.body.password,
          email: req.body.email,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
          .then(() => {
            res.status(200).json({
              message: `User ${req.body.login} successful registration!`
            });
          })
          .catch(error => {
            next(error);
          });
      } else {
        res
          .status(200)
          .json({ message: `User ${req.body.login} already exists` });
      }
    })
    .catch(error => {
      next(error);
    });
}

function secret(req, res, next) {
  try {
    res.json({ message: "Success! You can not see this without a token" });
  } catch (error) {
    next(error);
  }
}

export { login, addUser, secret };

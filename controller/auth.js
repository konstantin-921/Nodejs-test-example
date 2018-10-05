import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models/index';

function addUser(req, res, next) {
  const passwordFromUser = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  req.body.password = passwordToSave;

  
  models.Users.findOne({
    where: { email: req.body.email }
  })
    .then(users => {
      if (!users) {
        models.Users.create({
          password: req.body.password,
          email: req.body.email,
          language: req.body.language,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
          .then(user => {
            const payload = { user: user.id };
            const token = jwt.sign(payload, 'tasmanianDevil', {
              expiresIn: '7d'
            });
            res.status(201).json({
              message: `User ${req.body.email} successful registration!`,
              token
            });
          })
          .catch(error => {
            next(error);
          });
      } else {
        res
          .status(409)
          .json({ message: `User ${req.body.email} already exists` });
      }
    })
    .catch(error => {
      next(error);
    });
}

export default addUser;
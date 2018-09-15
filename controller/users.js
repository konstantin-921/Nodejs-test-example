import models from "../models/index";

function oneUser(req, res, next) {
  console.log("-------request--------", req);
  return models.Users.findAll({
    where: {
      login: req.body.login
    },
    raw: true
  })
    .then(() => {
      console.log("Oops");
      return res.status(200).send("users");
    })
    .catch(error => {
      next(error);
    });
}

function allUsers(req, res, next) {
  models.Users.findAll({
    attributes: ["login", "id"],
    raw: true
  })
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      next(error);
    });
}

export { allUsers, oneUser };

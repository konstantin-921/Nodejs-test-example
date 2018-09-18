import models from "../models/index";

function oneUser(req, res, next) {
  models.Users.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "login"],
    raw: true
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(error => {
      next(error);
    });
}

function allUsers(req, res, next) {
  let data;
  const PAGE = 1;
  const PER = 5;
  const { page, per, sort } = req.query;
  if (page && per) {
    data = +page * +per - +per;
  } else {
    data = +PAGE * +PER - +PER;
  }
  models.Users.findAll({
    offset: data,
    limit: per || PER,
    attributes: ["id", "login"],
    raw: true
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(error => {
      next(error);
    });
}

export { allUsers, oneUser };

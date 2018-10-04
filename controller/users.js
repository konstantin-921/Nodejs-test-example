import models from "../models/index";
import extractId from "../services/extractId";

function getUser(req, res, next) {
  const id = extractId(req);
  
  models.Users.findOne({
    where: {
      id
    },
    attributes: ["email", "language"],
    raw: true
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(error => {
      next(error);
    });
}

function getAllUsers(req, res, next) {
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

async function updateLanguage(req, res, next) {
  try {
    const id = extractId(req);
    const user = await models.Users.update({language: req.body.lang},
      {
        where: {
          id
        },
    })
    res.status(200).send({
      message: 'Success update language',
    });
  }
  catch(error){
    next(error)
  }

}

export { getAllUsers, getUser, updateLanguage };

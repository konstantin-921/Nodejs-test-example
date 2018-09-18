import models from "../models/index";

function addBoard(req, res, next) {
  models.Boards.create({
    title: req.body.title,
    share: req.body.share,
    owner: req.body.owner,
    user_id: req.body.user_id,
    createdAt: Date.now(),
    updatedAt: Date.now()
  })
    .then(() => {
      res.status(201).json({
        message: `User ${req.body.title} successful create!`
      });
    })
    .catch(error => {
      next(error);
    });
}

function getBoards(req, res, next) {
  models.Boards.findAll({})
    .then(() => {
      res.status(201).json({});
    })
    .catch(error => {
      next(error);
    });
}

export { getBoards, addBoard };

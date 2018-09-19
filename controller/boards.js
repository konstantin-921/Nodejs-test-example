import models from '../models/index';

const { Op, where, col } = models.sequelize;

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
  const id = Number(req.query.id);
  // models.Boards.findAll({
  //   where: {
  //     users_id: req.query.id
  //   },
  //   raw: true,
  //   include: [
  //     {
  //       as: 'Share',
  //       model: models.Users
  //       // where: {
  //       //   '$Share.Shares.boards_id$': req.query.id
  //       // }
  //     }
  //   ]
  // })
  models.Shares.findAll({
    attributes: ['boards_id'],
    where: {
      users_id: id
    },
    raw: true
  })
    .then(boards => {
      const data = boards.map(elem => elem.boards_id);
      const currentData = [...data, id];
      return models.Boards.findAll({
        where: {
          id: {
            [Op.in]: currentData
          }
        },
        raw: true
      });
    })
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      next(error);
    });
}

export { getBoards, addBoard };

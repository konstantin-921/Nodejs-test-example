import models from '../models/index';

const { Op, where, col } = models.sequelize;

function addBoard(req, res, next) {
  models.Boards.create({
    title: req.body.title,
    owned: req.body.owned,
    owner: req.body.owner,
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

async function deleteBoard(req, res, next) {
  try {
    await models.Boards.findOne({
      where: {
        id: req.params.id
      }
    }).then(board => {
      board.destroy();
    });
    res.status(200).send({
      message: `Successful delete!`
    });
  } catch (error) {
    next(error);
  }
}

async function getOneBoard(req, res, next) {
  try {
    const data = await models.Boards.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'owner'],
      raw: true
    });
    res.status(200).send({
      message: 'success',
      data
    });
  } catch (error) {
    next(error);
  }
}

async function getBoards(req, res, next) {
  try {
    let offset;
    const PAGE = 1;
    const PER = 5;
    const { page, per, sort } = req.query;
    if (page && per) {
      offset = +page * +per - +per;
    } else {
      offset = +PAGE * +PER - +PER;
    }
    const data = await models.Boards.findAll({
      offset,
      limit: per || PER,
      subQuery: false,
      attributes: ['title', 'owner', 'id'],
      where: {
        [Op.or]: [
          where(col('owner'), req.query.id),
          where(col('users_id'), req.query.id)
        ]
      },
      include: {
        as: 'share',
        model: models.Users,
        attributes: ['id']
      },
      raw: true,
      required: false
    });
    res.status(200).send({
      message: 'success',
      data
    });
  } catch (error) {
    next(error);
  }
}

export { getOneBoard, getBoards, addBoard, deleteBoard };

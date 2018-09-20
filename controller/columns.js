import models from '../models/index';

async function getColumns(req, res, next) {
  const { boardId } = req.params;
  try {
    const data = await models.Columns.findAll({
      where: {
        boards_id: req.params.boardId
      },
      attributes: ['id', 'name', 'boards_id'],
      raw: true
    });
    res.status(200).send({
      message: 'Success',
      data
    });
  } catch (error) {
    next(error);
  }
}

async function addColumn(req, res, next) {
  try {
    const data = await models.Columns.create({
      name: req.body.name,
      boards_id: req.body.boards_id,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    res.status(201).json({
      message: `Column ${req.body.name} successful create!`
    });
  } catch (error) {
    next(error);
  }
}

async function deleteColumn(req, res, next) {
  try {
    await models.Columns.findOne({
      where: {
        id: req.params.id
      }
    }).then(column => {
      column.destroy();
    });
    res.status(200).json({
      message: `Column successful delete!`
    });
  } catch (error) {
    next(error);
  }
}

export { getColumns, addColumn, deleteColumn };

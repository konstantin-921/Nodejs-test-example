import models from '../models/index';

async function getTasks(req, res, next) {
  try {
    const data = await models.Tasks.findAll({
      where: {
        columns_id: req.params.columnId
      },
      raw: true
    });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
}

async function addTask(req, res, next) {
  try {
    const data = await models.Tasks.create({
      title: req.body.title,
      content: req.body.content,
      position: req.body.position,
      columns_id: req.body.columns_id
    });
    res.status(201).json({
      message: `Task ${req.body.title} successful create!`
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    await models.Tasks.findOne({
      where: {
        id: req.params.id
      }
    }).then(task => {
      task.destroy();
    });
    res.status(200).json({
      message: 'Task successful delete!'
    });
  } catch (error) {
    next(error);
  }
}

export { getTasks, addTask, deleteTask };

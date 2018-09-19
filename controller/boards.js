import models from "../models/index";

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
  models.Boards.findAll({
    // where: {
    //   users_id: req.query.id
    // },
    raw: true,
    include: [
      {
        as: "Share",
        model: models.Users,
        where: {
          users_id: [where(col("user_id"), req.query.id)]
        }
      }
    ]
  })
    .then(boards => {
      console.log("====================================");
      console.log(boards);
      console.log("====================================");
      // console.log("====================================");
      // console.log(boards[0]["Share.Shares.boards_id"]);
      // console.log("====================================");
      res.status(200).send(boards);
    })
    .catch(error => {
      next(error);
    });
}

export { getBoards, addBoard };

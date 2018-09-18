import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";
import models from "../models/index";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// eslint-disable-next-line no-undef
describe("---Test users route---", () => {
  // eslint-disable-next-line no-undef
  // beforeEach(done => {
  //   models.sequelize
  //     .sync({ force: true })
  //     .then(() => {
  //       models.Shares.create({
  //         users_id: 1,
  //         boards_id: 1
  //       });
  //       done();
  //     })
  //     .catch(error => {
  //       done(error);
  //     });
  // });
  // eslint-disable-next-line no-undef
  it("it should POST /api/boards", done => {
    const board = {
      title: "Board 1",
      users_id: 1,
      share: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    chai
      .request(server)
      .post(`/api/boards`)
      .send(board)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message");
        server.close();
        done();
      });
  });
});

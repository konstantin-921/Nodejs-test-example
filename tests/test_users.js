import chai from "chai";
import chaiHttp from "chai-http";
import models from "../models/index";
import server from "../app";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

describe("---Test users route---", () => {
  it("it should GET /api/user/:id ", done => {
    const user = { id: 1 };
    chai
      .request(server)
      .get(`/api/user/${user.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property("login");
        server.close();
        done();
      });
  });
  it("it should GET /api/user", done => {
    chai
      .request(server)
      .get(`/api/user`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property("password");
        server.close();
        done();
      });
  });
});

import chai from "chai";
import chaiHttp from "chai-http";
import models from "../models/index";
import server from "../app";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

describe("---Test auth route---", () => {
  it("it should POST /api/auth/signUp", done => {
    const user = {
      login: "Vova",
      password: "1",
      email: "vova@yandex.ru"
    };
    chai
      .request(server)
      .post(`/api/auth/signUp`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        server.close();
        done();
      });
  });
  it("it should GET /api/auth/signIn", done => {
    chai
      .request(server)
      .get("/api/auth/signIn?login=Vova&password=1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("token");
        server.close();
        done();
      });
  });
});

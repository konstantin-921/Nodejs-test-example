import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// eslint-disable-next-line no-undef
describe("---Test users route---", () => {
  // eslint-disable-next-line no-undef
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
  // eslint-disable-next-line no-undef
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

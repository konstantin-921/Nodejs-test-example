import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models/index';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-undef
describe('---Test columns route---', () => {
  // eslint-disable-next-line no-undef
  beforeEach(done => {
    models.sequelize
      .sync({ force: true })
      .then(async () => {
        await models.Users.create({
          login: 'bob',
          password: '1',
          email: 'fbenbe'
        });
        await models.Boards.create({
          title: 'Board 56',
          owner: 1,
          owned: false
        });
        await models.Columns.create({
          name: 'Column 1',
          boards_id: 1
        });
        await models.Columns.create({
          name: 'Column 2',
          boards_id: 1
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it('it should GET /api/columns', done => {
    const boardId = 1;
    chai
      .request(server)
      .get(`/api/columns/${boardId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should POST /api/columns', done => {
    const column = {
      name: 'Column 123',
      boards_id: 1
    };
    chai
      .request(server)
      .post(`/api/columns`)
      .send(column)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should DELETE /api/columns/:id', done => {
    const id = 1;
    chai
      .request(server)
      .delete(`/api/columns/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
});

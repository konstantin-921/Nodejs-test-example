import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models/index';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-undef
describe('---Test boards route---', () => {
  // eslint-disable-next-line no-undef
  beforeEach(done => {
    models.sequelize
      .sync({ force: true })
      .then(async () => {
        await models.Users.create({
          password: '1',
          email: 'fbenbe',
          language: 'en'
        });
        await models.Users.create({
          password: '1',
          email: 'fbss',
          language: 'en'
        });
        await models.Boards.create({
          title: 'Board 56',
          owner: 1,
          owned: false
        });
        await models.Boards.create({
          title: 'Board 78',
          owner: 2,
          owned: false
        });
        await models.Boards.create({
          title: 'Board 100',
          owner: 2,
          owned: false
        });
        await models.Columns.create({
          name: 'Column for cascad delete',
          boards_id: 1
        });
        await models.Tasks.create({
          title: 'Task for cascad delete',
          content: 'AbraKadabra',
          position: 1,
          columns_id: 1
        });
        await models.Shares.create({
          users_id: 1,
          boards_id: 3
        });
        await models.Shares.create({
          users_id: 1,
          boards_id: 2
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it('it should GET /api/boards', done => {
    chai
      .request(server)
      .get(`/api/boards?id=1&page=1&per=5&sort=true`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should GET /api/boards/:id', done => {
    const id = 1;
    chai
      .request(server)
      .get(`/api/boards/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.have.property('id');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should POST /api/boards', done => {
    const board = {
      title: 'Board 1',
      owner: 1,
      owned: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    chai
      .request(server)
      .post(`/api/boards`)
      .send(board)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should DELETE /api/boards/:id', done => {
    const id = 1;
    chai
      .request(server)
      .delete(`/api/boards/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
});

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
        await models.Tasks.create({
          title: 'Task 1',
          content: 'AbraKadabra',
          position: 1,
          columns_id: 1
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it('it should GET /api/tasks:columnId', done => {
    const columnId = 1;
    chai
      .request(server)
      .get(`/api/tasks/${columnId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property('content');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should POST /api/tasks', done => {
    const task = {
      title: 'Hard task',
      content: 'AvadaKedavra',
      position: 1,
      columns_id: 1
    };
    chai
      .request(server)
      .post(`/api/tasks`)
      .send(task)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should DELETE /api/tasks/:id', done => {
    const id = 1;
    chai
      .request(server)
      .delete(`/api/tasks/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
});

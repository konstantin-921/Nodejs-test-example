import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import models from '../models/index';
import server from '../app';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-undef
describe('---Test users route---', () => {
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
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it('it should GET /api/users/currentUser ', done => {
    const payload = { user: 1 };
    const auth = jwt.sign(payload, 'tasmanianDevil', {expiresIn: '7d'});
    const token = `bearer ${auth}`;
    
    chai
      .request(server)
      .get(`/api/users/currentUser`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('email');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should GET /api/users', done => {
    // const payload = { user: 1 };
    // const auth = jwt.sign(payload, 'tasmanianDevil', {expiresIn: '7d'});
    // const token = `bearer ${auth}`;

    chai
      .request(server)
      .get(`/api/users?page=1&per=5&sort=true`)
      // .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property('email');
        server.close();
        done();
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import models from "../models/index";
import app from '../app';

const should = chai.should();


chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

describe('Users', () => {
  // beforeEach((done) => { //Before each test we empty the database
  //   models.Users.remove({}, (err) => {
  //     done();
  //   });
  // });
  describe('/GET book', () => {
    it('it should GET', (done) => {
      const user = { id: 1 };
      chai.request(app)
        .get(`/api/user/${user.id}`)
        .end((err, res) => {
          console.log('====================================');
          console.log(res.body);
          console.log('====================================');
          res.should.have.status(200);
          res.body[0].should.have.property('login');
          done();
        });
    });
  });
});
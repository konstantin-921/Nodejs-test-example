import { expect } from 'chai';
import models from '../models/index';

// eslint-disable-next-line no-undef
describe('---Test model---', () => {
  // eslint-disable-next-line no-undef
  beforeEach(done => {
    models.sequelize
      .sync({ force: true })
      .then(async () => {
        const data = await models.Users.create({
          password: '1',
          email: 'sam@yandex.ru',
          language: 'en',
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it('User should wrong data type in email', done => {
    models.Users.create({
      email: 1,
      password: '1',
      language: 'en',
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
      .then(() => {
        expect.fail();
        done();
      })
      .catch(err => {
        expect(err.name).to.be.equal('AssertionError');
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('User should void in email', done => {
    models.Users.create({
      email: null,
      password: '1',
      language: 'en',
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
      .then(() => {
        expect.fail();
        done();
      })
      .catch(err => {
        expect(err.name).to.be.equal('SequelizeValidationError');
        done();
      });
  });
});

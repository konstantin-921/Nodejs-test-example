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
          login: 'sam',
          password: '1',
          email: 'sam@yandex.ru'
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it('User should wrong data type in login', done => {
    models.Users.create({
      login: 1,
      email: '1@gmail',
      password: '1',
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

  // eslint-disable-next-line no-undef
  it('User should void in login', done => {
    models.Users.create({
      login: null,
      email: '1@gmail',
      password: '1',
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

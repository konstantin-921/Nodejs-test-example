import { expect } from "chai";

const db = require("../models/index");

describe("company model", () => {
  let user;
  beforeEach(done => {
    db.sequelize
      .sync({ force: true })
      .then(async () => {
        const data = await db.Users.create({
          login: "sam",
          password: "1",
          email: "sam@yandex.ru"
        });
        user = data;
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  it("should have users", async () => {
    const users = await db.Users.findOne({
      row: true,
      where: { login: "sam" }
    });
    expect(users.login).to.equal("sam");
  });
  it("have users association", async () => {
    const data = await db.Boards.create({
      title: "34",
      share: true
    }).then(boards => {
      return user.hasBoards(boards).then(result => {
        return result;
      });
    });
    expect(data).to.equal(false);
  });
});

// import { expect } from "chai";

// import db from "../models/index";

// describe("company model", () => {
//   let user;
//   beforeEach(done => {
//     db.sequelize
//       .sync({ force: true })
//       .then(async () => {
//         const data = await db.Users.create({
//           login: "sam",
//           password: "1",
//           email: "sam@yandex.ru"
//         });
//         user = data;
//         done();
//       })
//       .catch(error => {
//         done(error);
//       });
//   });
//   it("should have users", async () => {
//     const users = await db.Users.findOne({
//       row: true,
//       where: { login: "sam" }
//     });
//     expect(users.login).to.equal("sam");
//   });
//   it("have users association", async () => {
//     const data = await db.Boards.create({
//       title: "34",
//       share: true
//     }).then(boards => user.hasBoards(boards).then(result => result));
//     expect(data).to.equal(false);
//   });
//   it("User should wrong data type in login", done => {
//     db.Users.create({
//       login: 1,
//       email: "1@gmail",
//       password: "1",
//       createdAt: Date.now(),
//       updatedAt: Date.now()
//     })
//       .then(() => {
//         expect.fail();
//         done();
//       })
//       .catch(err => {
//         expect(err.name).to.be.equal("SequelizeValidationError");
//         done();
//       });
//   });

//   it("User should void in login", done => {
//     db.Users.create({
//       login: null,
//       email: "1@gmail",
//       password: "1",
//       createdAt: Date.now(),
//       updatedAt: Date.now()
//     })
//       .then(() => {
//         expect.fail();
//         done();
//       })
//       .catch(err => {
//         expect(err.name).to.be.equal("SequelizeValidationError");
//         done();
//       });
//   });
// });

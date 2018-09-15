import sinon from "sinon";
import sinonStubPromise from "sinon-stub-promise";
import models from "../models/index";
import { expect } from "chai";
import { oneUser } from "../controller/users";

sinonStubPromise(sinon);

describe("printMovies", () => {
  let stubedFetch;
  beforeEach(() => {
    stubedFetch = sinon.stub(models.Users, "findAll").returnsPromise();
  });
  afterEach(() => {
    sinon.restore(models.Users.findAll);
  });

  it("should work", () => {
    stubedFetch.resolves("resolve value");

    var testObject = {};
    doSomethingWithAPromise(promise, testObject);
    expect(testObject.resolved).to.eql("resolve value");
  });
});

// import sinon from "sinon";
// import models from "../models/index";
// import sinonStubPromise from 'sinon-stub-promise';
// import { expext } from "chai";

// sinonStubPromise(sinon);

// describe('stubbing a promise', function() {
//   var promise;

//   beforeEach(function() {
//     promise = sinon.stub(models.Users, "findAll").returnsPromise();
//   });

//   it('can resolve', function() {
//     promise.resolves('resolve value')

//     var testObject = {};
//     doSomethingWithAPromise(promise, testObject);
//     expect(testObject.resolved).to.eql('resolve value');
//   });

//   it('can reject', function() {
//     promise.rejects('reject value')

//     var testObject = {};
//     doSomethingWithAPromise(promise, testObject);
//     expect(testObject.rejected).to.eql('reject value');
//   });
// }

// import sinon from "sinon";
// import models from "../models/index";
// import { oneUser } from "../controller/users";

// describe("routes", () => {
//   beforeEach(() => {
//     sinon.stub(models.Users, "findAll");
//   });

//   afterEach(() => {
//     models.Users.findAll.restore();
//   });

//   it("should send all memes", () => {
//     const expectedModels = {
//       where: {
//         login: "sam"
//       },
//       raw: true
//     };
//     // const expectedModels = "sam";
//     // models.Users.findAll.withArgs(expectedModels).yields(null, expectedModels);
//     models.Users.findAll.withArgs(expectedModels).yields();

//     const req = { body: { login: "sam" } };
//     const res = {
//       send: sinon.stub()
//     };

//     oneUser(req, res);
//     console.log("-----response-------", req);

//     sinon.assert.calledWith(res.send, expectedModels);
//   });
// });

// import chai from "chai";
// import "mocha";
// import "chai/register-should";
// import sinon from "sinon";
// import sinonChai from "sinon-chai";
// import models from "../models/index";
// import { oneUser } from "../controller/users";

// chai.use(sinonChai);

// describe("User controller", () => {
//   describe("post function", () => {
//     let findAll;
//     let req;
//     let status;
//     let send;
//     let res;

//     beforeEach(() => {
//       findAll = sinon.stub(models.Users, "findAll");
//       findAll.resolves(null);
//       req = { body: { login: "sam" } };
//       status = sinon.stub();
//       send = sinon.spy();
//       res = { send, status };
//       status.returns(res);
//       oneUser(req, res);
//     });
//     afterEach(() => {
//       findAll.restore();
//     });
//     it("should return a 200 status", async done => {
//       try {
//         const handlerResult = await oneUser(req, res);
//         const data = handlerResult;
//         res.status.should.be.calledWith(200);
//         res.send.should.be.calledWith("users");
//         findAll.restore();
//         done();
//       } catch (err) {
//         console.log("---err", err);
//       }
//     });
//   });
// });

// const httpMocks = require("node-mocks-http");

// describe("GET /api/users", () => {
//   it("should return 'hello world' for GET /example", () => {
//     const mockRequest = httpMocks.createRequest({
//       method: "GET",
//       url: "/api/user"
//     });
//     const mockResponse = httpMocks.createResponse();
//     oneUser(mockRequest, mockResponse);

//     const actualResponseBody = mockResponse._getData();
//     const expectedResponseBody = "hello world!";

//     console.log("--------------", actualResponseBody);

//     expect(actualResponseBody).to.equal(expectedResponseBody);
//   });
// });

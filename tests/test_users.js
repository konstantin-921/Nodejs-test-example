import { expect } from "chai";
import { oneUser } from "../controller/users";

const httpMocks = require("node-mocks-http");

describe("GET /api/users", () => {
  it("should return 'hello world' for GET /example", () => {
    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/api/user"
    });
    const mockResponse = httpMocks.createResponse();
    oneUser(mockRequest, mockResponse);

    const actualResponseBody = mockResponse._getData();
    const expectedResponseBody = "hello world!";

    console.log("--------------", actualResponseBody);

    expect(actualResponseBody).to.equal(expectedResponseBody);
  });
});

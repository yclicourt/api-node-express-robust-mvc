const app = require("../app");
const request = require("supertest");

const api = request(app);

describe("POST /tracks", () => {

  // should respond with a content of application/json
  test("should have a content-type: application in header", async () => {
    const response = await request(app).post("/api/v1/tracks").send();
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

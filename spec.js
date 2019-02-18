const request = require("supertest");
describe("loading express", function() {
  var server;
  beforeEach(function() {
    server = require("./index");
  });
  afterEach(function() {
    server.close();
  });
  it("responds to /api", function test(done) {
    request(server)
      .get("/api")
      .expect(200, done);
  });
  it("reponds to /api/search with keyword", function test(done) {
    request(server)
      .get("/api/search?keyword=backpack")
      .expect(200, done);
  });
  it("reponds to /api/search wihout keyword", function test(done) {
    request(server)
      .get("/api/search")
      .expect(400, done);
  });
});

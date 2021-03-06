const request = require("supertest");
// require = require("really-need");
describe("loading express", function() {
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve("./index")];
    server = require("./index");
  });
  afterEach(function(done) {
    server.close(done());
  });
  it("responds to /api", function test(done) {
    request(server)
      .get("/api")
      .expect(200, done);
  });
  it("reponds to /api/itemMeta with keyword", function test(done) {
    request(server)
      .get("/api/itemMeta?keyword=backpack")
      .expect(200, done);
  });
  it("reponds to /api/itemMeta wihout keyword", function test(done) {
    request(server)
      .get("/api/itemMeta")
      .expect(400, done);
  });
});

import request from "supertest";
import * as app  from "../../server";


jest.setTimeout(10000);
let server: { close: (arg0: jest.DoneCallback) => void; };
beforeAll(async () => {
  const mod = await import('../../server');
  server = (mod as any).default;
});
afterAll((done) => {
    if (server) {
        server.close(done);
      }
  done();
});
describe("POST /api/posts/all", () => {
  test("should respond with 200", async () => {
    const response = await request(server)
      .post("/api/posts/all")
      .send({
        search: "",
        sort: {
          key: "dateLastEdited",
          type: "desc",
        },
        page: "1",
        limit: "10",
      });

    // expect(response.statusCode).toBe(200);
    
  });
  test("should have posts object", async () => {
    const response = await request(server)
      .post("/api/posts/all")
      .send({
        search: "",
        sort: {
          key: "dateLastEdited",
          type: "desc",
        },
        page: "1",
        limit: "10",
      });

    // expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('posts')
  });

  test("should have totalCount object", async () => {
    const response = await request(server)
      .post("/api/posts/all")
      .send({
        "search":"the king",
        "sort":{
            "key":"dateLastEdited",
            "type":"desc"
        },
        "page":"1",
        "limit":"10"
    });

    // expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('totalCount')
  });

  test("should have totalCount object as 4 when search string contains 'the king' ", async () => {
    const response = await request(server)
      .post("/api/posts/all")
      .send({
        "search":"the king",
        "sort":{
            "key":"dateLastEdited",
            "type":"desc"
        },
        "page":"1",
        "limit":"10"
    });

    // expect(response.statusCode).toBe(200);
    expect(response.body.totalCount).toBe(4);
  });
});

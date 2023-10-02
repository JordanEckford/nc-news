const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
 test("GET: should respond with a 200 status code", () => {
  return request(app).get("/api/topics").expect(200);
 });
 test("should return an array of objects, all with correct properties", () => {
  return request(app)
   .get("/api/topics")
   .then(({ body }) => {
    expect(body.topics.length).toBe(3);
    body.topics.forEach((topic) => {
     expect(typeof topic.description).toBe("string");
     expect(typeof topic.slug).toBe("string");
    });
   });
 });
});
describe("ANY request to invalid path", () => {
 test("should respond with a 404 error and message when atempt to access invalid path", () => {
  return request(app)
   .get("/api/notapath")
   .expect(404)
   .then(({ body }) => {
    expect(body.msg).toBe("invalid path");
   });
 });
});

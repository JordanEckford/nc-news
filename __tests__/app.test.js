const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const endPoints = require("../endpoints.json");

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
 test("should respond with a 404 error and message when attempt to access invalid path", () => {
  return request(app)
   .get("/api/notapath")
   .expect(404)
   .then(({ body }) => {
    expect(body.msg).toBe("invalid path");
   });
 });
});
describe("/api", () => {
 test("should respond with a 200 status code", () => {
  return request(app).get("/api").expect(200);
 });
 test("should respond with an object with all available endpoints on the API", () => {
  return request(app)
   .get("/api")
   .then(({ body }) => {
    expect(body.endpoints).toEqual(endPoints);
   });
 });
});
describe("/api/articles/:article_id", () => {
 test("should respond with the correct status code and article object", () => {
  return request(app)
   .get("/api/articles/3")
   .expect(200)
   .then(({ body }) => {
    expect(body.article).toEqual({
     article_id: 3,
     title: "Eight pug gifs that remind me of mitch",
     topic: "mitch",
     author: "icellusedkars",
     body: "some gifs",
     created_at: "2020-11-03T09:12:00.000Z", //T seperates time and date, 000Z is offset from UTC
     votes: 0,
     article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    });
   });
 });
 test("should return an appropriate error when an id that doesnt exist is requested", () => {
  return request(app)
   .get("/api/articles/9999")
   .expect(404)
   .then(({ body }) => {
    expect(body.msg).toBe("article does not exist");
   });
 });
 test("should return appropriate error when invalid id type is requested", () => {
  return request(app)
   .get("/api/articles/notanumber")
   .expect(400)
   .then(({ body }) => {
    expect(body.msg).toBe("bad request");
   });
 });
});

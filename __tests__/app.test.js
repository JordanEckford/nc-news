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
describe("/api/articles", () => {
 test("should return the correct status code and array of objects", () => {
  return request(app)
   .get("/api/articles")
   .expect(200)
   .then(({ body }) => {
    expect(body.articles.length).toBe(13);
    body.articles.forEach((article) => {
     expect(article.body).toBe(undefined);
     expect.objectContaining({
      author: expect.any(String),
      title: expect.any(String),
      article_id: expect.any(Number),
      topic: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      article_img_url: expect.any(String),
      comment_count: expect.any(String),
     });
    });
    expect(body.articles).toBeSortedBy("created_at", { descending: true });
   });
 });
});
describe("/api/articles/article:id/comments", () => {
 test("should return a correct status code and an array of correct comment objects in correct order", () => {
  return request(app)
   .get("/api/articles/3/comments")
   .expect(200)
   .then(({ body }) => {
    expect(body.comments.length).toBe(2);
    body.comments.forEach((comment) => {
     expect(comment.article_id).toBe(3);
    });
    expect(body.comments).toBeSortedBy("created_at", { descending: true });
   });
 });
 test("should return a 400 error when passed a bad request", () => {
  return request(app)
   .get("/api/articles/numberthree/comments")
   .expect(400)
   .then(({ body }) => {
    expect(body.msg).toBe("bad request");
   });
 });
 test("should return the correct error when no article_id match is found", () => {
  return request(app)
   .get("/api/articles/999/comments")
   .expect(404)
   .then(({ body }) => {
    expect(body.msg).toBe("article does not exist");
   });
 });
});
describe("POST /api/articles/:article_id/comments", () => {
 test("should respond with correct status and newly created comment", () => {
  const testComment = { username: "lurker", body: "Wow this is incredible" };
  return request(app)
   .post("/api/articles/11/comments")
   .send(testComment)
   .expect(201)
   .then(({ body }) => {
    expect(body.comment).toEqual(
     expect.objectContaining({
      comment_id: 19,
      body: "Wow this is incredible",
      article_id: 11,
      author: "lurker",
      votes: 0,
      created_at: expect.any(String),
     })
    );
   });
 });
 test("should respond with an error when passed a bad request for article_id", () => {
  const testComment = { username: "lurker", body: "Wow this is incredible" };
  return request(app)
   .post("/api/articles/eleven/comments")
   .send(testComment)
   .expect(400)
   .then(({ body }) => {
    expect(body.msg).toBe("bad request");
   });
 });
 test("should respond with an error when passed an article_id not matching in the DB", () => {
  const testComment = { username: "lurker", body: "Wow this is incredible" };
  return request(app)
   .post("/api/articles/999/comments")
   .send(testComment)
   .expect(400)
   .then(({ body }) => {
    expect(body.msg).toBe("bad request");
   });
 });
 test("should respond with appropriate error when username does not exist, but valid article_id is passed", () => {
  const testComment = { username: "bananaman", body: "Wow this is incredible" };
  return request(app)
   .post("/api/articles/11/comments")
   .send(testComment)
   .expect(404)
   .then(({ body }) => {
    expect(body.msg).toBe("user not found");
   });
 });
});

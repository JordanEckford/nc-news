const express = require("express");
const { getTopics, getEndpoints } = require("./controllers/topics.controller");
const {
 invalidPath,
 handleCustomErrors,
 handlePSQLErrors,
 handle500Errors,
} = require("./controllers/errors.controller");
const {
 getArticleByID,
 getArticles,
 patchArticleByID,
} = require("./controllers/articles.controller");
const {
 getCommentsByArticleID,
 postComment,
} = require("./controllers/comments.controller");

const app = express();

//middleware connections
app.use(express.json());

//middleware routes
app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleByID);
app.patch("/api/articles/:article_id", patchArticleByID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);
app.post("/api/articles/:article_id/comments", postComment);

//error handling

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

//invalid path catcher
app.use("/*", invalidPath);

module.exports = app;

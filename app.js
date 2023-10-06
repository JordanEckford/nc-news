const express = require("express");
const {
 getTopics,
 getEndpoints,
 postTopic,
} = require("./controllers/topics.controller");
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
 postArticle,
 deleteArticle,
} = require("./controllers/articles.controller");
const {
 getCommentsByArticleID,
 postComment,
 deleteCommentByID,
 patchCommentByID,
} = require("./controllers/comments.controller");
const {
 getUsers,
 getUserByUsername,
} = require("./controllers/users.controller");

const app = express();

//middleware connections
app.use(express.json());

//middleware routes
app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.post("/api/topics", postTopic);

app.get("/api/articles", getArticles);
app.post("/api/articles", postArticle);
app.get("/api/articles/:article_id", getArticleByID);
app.patch("/api/articles/:article_id", patchArticleByID);
app.delete("/api/articles/:article_id", deleteArticle);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);
app.post("/api/articles/:article_id/comments", postComment);

app.get("/api/users", getUsers);
app.get("/api/users/:username", getUserByUsername);

app.patch("/api/comments/:comment_id", patchCommentByID);
app.delete("/api/comments/:comment_id", deleteCommentByID);

//error handling

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

//invalid path catcher
app.use("/*", invalidPath);

module.exports = app;

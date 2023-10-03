const express = require("express");
const { getTopics, getEndpoints } = require("./controllers/topics.controller");
const {
 invalidPath,
 handleCustomErrors,
 handlePSQLErrors,
} = require("./controllers/errors.controller");
const {
 getArticleByID,
 getArticles,
} = require("./controllers/articles.controller");
const { getCommentsByArticleID } = require("./controllers/comments.controller");

const app = express();

//middleware connections
//app.use(express.json()); NOT NEEDED YET

//middleware routes
app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);

//error handling

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
//invalid path catcher
app.use("/*", invalidPath);

module.exports = app;

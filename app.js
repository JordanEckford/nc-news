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
 deleteCommentByID,
 patchCommentByID,
 postCommentByArticleID,
} = require("./controllers/comments.controller");
const {
 getUsers,
 getUserByUsername,
} = require("./controllers/users.controller");
const apiRouter = require("./routes/api-router");

const app = express();

//middleware connections
app.use(express.json());

//middleware routes
app.use("/api", apiRouter);

//error handling

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

//invalid path catcher
app.use("/*", invalidPath);

module.exports = app;

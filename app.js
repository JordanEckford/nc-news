const express = require("express");
const {
 getTopics,
 getArticleByID,
 getEndPoints,
 getEndpoints,
} = require("./controllers/topics.controller");
const {
 invalidPath,
 handleCustomErrors,
 handlePSQLErrors,
} = require("./controllers/errors.controller");

const app = express();

//middleware connections
//app.use(express.json()); NOT NEEDED YET

//middleware routes
app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleByID);

//error handling

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
//invalid path catcher
app.use("/*", invalidPath);

module.exports = app;

const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { invalidPath } = require("./controllers/errors.controller");
const app = express();

//middleware connections
app.use(express.json());

//middleware routes
app.get("/api/topics", getTopics);

//error handling

//invalid path catcher
app.use("/*", invalidPath);

module.exports = app;

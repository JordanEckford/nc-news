const { fetchTopics } = require("../models/topics.model");
const endpoints = require("../endpoints.json");

exports.getTopics = (req, res, next) => {
 fetchTopics().then((response) => {
  res.status(200).send({ topics: response });
 });
};

exports.getEndpoints = (req, res, next) => {
 res.status(200).send({ endpoints });
};

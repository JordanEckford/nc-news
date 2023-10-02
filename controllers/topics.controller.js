const { fetchTopics, fetchArticleByID } = require("../models/topics.model");
const endpoints = require("../endpoints.json");


exports.getTopics = (req, res, next) => {
 fetchTopics().then((response) => {
  res.status(200).send({ topics: response });
 });
};

exports.getArticleByID = (req, res, next) => {
 const articleID = req.params.article_id;
 fetchArticleByID(articleID)
  .then((article) => {
   res.status(200).send({ article });
  })
  .catch((err) => {
   next(err);
  });

exports.getEndpoints = (req, res, next) => {
 res.status(200).send({ endpoints });

};

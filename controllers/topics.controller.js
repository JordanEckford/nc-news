const { fetchTopics, fetchArticleByID } = require("../models/topics.model");

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
};

const { fetchArticleByID, fetchArticles } = require("../models/articles.model");

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

exports.getArticles = (req, res, next) => {
 fetchArticles().then((articles) => {
  res.status(200).send({ articles });
 });
};

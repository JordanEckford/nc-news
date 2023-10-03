const {
 fetchArticleByID,
 fetchArticles,
 modifyArticle,
} = require("../models/articles.model");

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

exports.patchArticleByID = (req, res, next) => {
 const { article_id } = req.params;
 const { inc_votes } = req.body;

 if (inc_votes === undefined || Object.keys(req.body).length > 1) {
  return next({ status: 400, msg: "post request incorrect" });
 }
 modifyArticle(article_id, inc_votes)
  .then((article) => {
   res.status(201).send({ article });
  })
  .catch((err) => {
   next(err);
  });
};

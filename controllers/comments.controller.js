const {
 fetchCommentsByArticleID,
 createComment,
 removeComment,
} = require("../models/comments.model");
const { fetchUsersByUsername } = require("../models/users.model");

exports.getCommentsByArticleID = (req, res, next) => {
 const { article_id } = req.params;
 fetchCommentsByArticleID(article_id)
  .then((comments) => {
   res.status(200).send({ comments });
  })
  .catch((err) => {
   next(err);
  });
};

exports.postComment = (req, res, next) => {
 const { article_id } = req.params;
 const { username, body } = req.body;
 if (username === undefined || body === undefined) {
  return next({ status: 400, msg: "post request incomplete" });
 }
 createComment(article_id, username, body)
  .then((comment) => {
   res.status(201).send({ comment });
  })
  .catch((err) => {
   next(err);
  });
};

exports.deleteCommentByID = (req, res, next) => {
 const { comment_id } = req.params;
 removeComment(comment_id)
  .then(() => {
   res.status(204).send();
  })
  .catch((err) => {
   next(err);
  });
};
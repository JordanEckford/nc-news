const {
 fetchCommentsByArticleID,
 createComment,
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

 fetchUsersByUsername(username)
  .then(() => {
   createComment(article_id, username, body)
    .then((comment) => {
     res.status(201).send({ comment });
    })
    .catch((err) => {
     next(err);
    });
  })
  .catch((err) => {
   next(err);
  });
};

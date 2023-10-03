const db = require("../db/connection");

exports.fetchCommentsByArticleID = (articleID) => {
 const query = `SELECT * FROM comments WHERE article_ID = $1 ORDER BY created_at DESC;`;
 return db.query(query, [articleID]).then(({ rows }) => {
  if (rows.length === 0) {
   return Promise.reject({ status: 404, msg: "article does not exist" });
  }
  return rows;
 });
};

exports.createComment = (articleID, username, body) => {
 const query = `
    INSERT INTO comments
    (article_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *
    ;`;
 return db.query(query, [articleID, username, body]).then(({ rows }) => {
  return rows[0];
 });
};

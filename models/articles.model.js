const db = require("../db/connection");

exports.fetchArticleByID = (articleID) => {
 const query = `SELECT * FROM articles WHERE article_id = $1;`;
 return db.query(query, [articleID]).then(({ rows }) => {
  if (rows.length === 0) {
   return Promise.reject({ status: 404, msg: "article does not exist" });
  }
  return rows[0];
 });
};

exports.fetchArticles = () => {
 const query = `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count FROM articles
    FULL OUTER JOIN comments
    ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`;
 return db.query(query).then(({ rows }) => {
  return rows;
 });
};

exports.modifyArticle = (articleID, inc_votes) => {
 const query = `
 UPDATE articles
 SET votes = votes + $1
 WHERE article_id = $2
 RETURNING *;
 `;
 return db.query(query, [inc_votes, articleID]).then(({ rows }) => {
  if (rows.length === 0) {
   return Promise.reject({ status: 404, msg: "article not found" });
  }
  return rows[0];
 });
};

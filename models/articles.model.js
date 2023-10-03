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

const db = require("../db/connection");

exports.fetchTopics = () => {
 return db.query("SELECT * FROM topics;").then(({ rows }) => {
  return rows;
 });
};

exports.fetchArticleByID = (articleID) => {
 const query = `SELECT * FROM articles WHERE article_id = $1;`;
 return db.query(query, [articleID]).then(({ rows }) => {
  if (rows.length === 0) {
   return Promise.reject({ status: 404, msg: "article does not exist" });
  }
  return rows[0];
 });
};

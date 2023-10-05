const db = require("../db/connection");

exports.fetchTopics = (topic) => {
 let query = "SELECT * FROM topics";
 const values = [];
 if (topic) {
  query += " WHERE slug = $1;";
  values.push(topic);
 }
 return db.query(query, values).then(({ rows }) => {
  if (rows.length === 0) {
   return Promise.reject({ status: 404, msg: "not found" });
  }
  return rows;
 });
};

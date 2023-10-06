const db = require("../db/connection");

exports.fetchUsers = () => {
 return db.query("SELECT * FROM users;").then(({ rows }) => {
  return rows;
 });
};

exports.fetchUsersByUsername = (username) => {
 return db
  .query(
   `
    SELECT * FROM users
    WHERE username = $1;`,
   [username]
  )
  .then((result) => {
   if (result.rowCount === 0) {
    return Promise.reject({ status: 404, msg: "user not found" });
   } else {
    return result.rows[0];
   }
  });
};

exports.createUser = (username, name, avatar_url) => {
 return db
  .query(
   `
 INSERT INTO users
 (username, name, avatar_url)
 VALUES
 ($1, $2, $3)
 RETURNING *;`,
   [username, name, avatar_url]
  )
  .then(({ rows }) => {
   return rows[0];
  });
};

// exports.removeUser = (username) => {
// articles could not be deleted as they had comments referencing them from other users
//  return db
//   .query(`DELETE FROM comments WHERE author = $1 RETURNING *;`, [username])
//   .then(({ rows }) => {
//    console.log("1", rows);
//    return db
//     .query(`DELETE FROM articles WHERE author = $1 RETURNING *;`, [username])
//     .then(({ rows }) => {
//      console.log("2", rows);
//      return db.query(`DELETE FROM users WHERE username = $1 RETURNING *;`, [
//       username,
//      ]);
//     });
//   })
//   .then(({ rows }) => {
//    console.log(rows);
//    if (rows.length === 0) {
//     return Promise.reject({ status: 404, msg: "user not found" });
//    } else return rows[0];
//   });
// };

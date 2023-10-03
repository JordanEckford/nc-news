const db = require("../db/connection");

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

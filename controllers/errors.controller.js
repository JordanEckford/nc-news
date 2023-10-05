exports.handleCustomErrors = (err, req, res, next) => {
 if (err.status && err.msg) {
  res.status(err.status).send({ msg: err.msg });
 }
 next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
 if (err.code === "22P02") {
  res.status(400).send({ msg: "bad request" });
 } else if (err.code === "23503") {
  res.status(404).send({ msg: "not found" });
 }
 next(err);
};

exports.invalidPath = (req, res, next) => {
 res.status(404).send({ msg: "invalid path" });
};

exports.handle500Errors = (err, req, res, next) => {
 res.status(500).send({ message: "internal server error!!" });
};

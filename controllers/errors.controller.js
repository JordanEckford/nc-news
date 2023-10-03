exports.handleCustomErrors = (err, req, res, next) => {
 if (err.status && err.msg) {
  res.status(err.status).send({ msg: err.msg });
 }
 next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
 if (err.code === "22P02" || err.code === "23503") {
  res.status(400).send({ msg: "bad request" });
 }
 next(err);
};

exports.handle500Errors = (err, req, res, next) => {
 res.status(500).send({ message: "internal server error!!" });
};

exports.invalidPath = (req, res, next) => {
 res.status(404).send({ msg: "invalid path" });
 next(err);
};

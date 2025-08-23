const ErrorResponse = require("../Utils/errorResponse");

const notFound = (req, res, next) => {
  const message = `Not Found - ${req.originalUrl}`;
  res.status(404);
  next(new ErrorResponse(message));
};

module.exports = notFound;

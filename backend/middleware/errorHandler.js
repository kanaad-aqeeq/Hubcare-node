// import ApiError from "../utils/apiError";
const ApiError = require("../utils/apiError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: err.data || null,
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

module.exports= errorHandler

class ApiError extends Error {
    constructor(statusCode, message, data = null) {
      super(message);
      this.statusCode = statusCode;
      this.data = data;
    Error.captureStackTrace(this, this.constructor);
    }
  
    static badRequest(message, data = null) {
      return new ApiError(400, message, data);
    }
  
    static unauthorized(message, data = null) {
      return new ApiError(401, message, data);
    }
  
    static forbidden(message, data = null) {
      return new ApiError(403, message, data);
    }
  
    static notFound(message, data = null) {
      return new ApiError(404, message, data);
    }
  
    static internalServerError(message, data = null) {
      return new ApiError(500, message, data);
    }
  
    static notImplemented(message, data = null) {
      return new ApiError(501, message, data);
    }
  
    static badGateway(message, data = null) {
      return new ApiError(502, message, data);
    }
  
    static serviceUnavailable(message, data = null) {
      return new ApiError(503, message, data);
    }
  
    static gatewayTimeout(message, data = null) {
      return new ApiError(504, message, data);
    }
  
    static conflict(message, data = null) {
      return new ApiError(409, message, data);
    }
  
    static lengthRequired(message, data = null) {
      return new ApiError(411, message, data);
    }
  
    static preconditionFailed(message, data = null) {
      return new ApiError(412, message, data);
    }
  
    static tooManyRequests(message, data = null) {
      return new ApiError(429, message, data);
    }
  
    static unavailableForLegalReasons(message, data = null) {
      return new ApiError(451, message, data);
    }
  
    static notAcceptable(message, data = null) {
      return new ApiError(406, message, data);
    }
  
    static paymentRequired(message, data = null) {
      return new ApiError(402, message, data);
    }
  
    static methodNotAllowed(message, data = null) {
      return new ApiError(405, message, data);
    }
  
    static unprocessableEntity(message, data = null) {
      return new ApiError(422, message, data);
    }
  
    static preconditionRequired(message, data = null) {
      return new ApiError(428, message, data);
    }
  }
  
module.exports = ApiError; // ✅ FIXED here
  
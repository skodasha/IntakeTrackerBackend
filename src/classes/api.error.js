class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(errors) {
    return new ApiError(401, 'Unauthorized', errors);
  }

  static BadRequest(message = 'Bad Request', errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message = 'Not found') {
    return new ApiError(404, message);
  }

  static InternalServerError(message = 'Internal Server Error') {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;

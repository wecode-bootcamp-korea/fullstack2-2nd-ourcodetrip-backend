class BadRequestError extends Error {
  constructor(customMessage) {
    super();
    this.status = 400;
    this.message = customMessage || 'Bad request';
  }
}

class UnauthorizedError extends Error {
  constructor(customMessage) {
    super();
    this.status = 401;
    this.message = customMessage || 'Unauthorized access';
  }
}

class ForbiddenError extends Error {
  constructor(customMessage) {
    super();
    this.status = 403;
    this.message = customMessage || 'Forbidden user';
  }
}

class NotFoundError extends Error {
  constructor(customMessage) {
    super();
    this.status = 404;
    this.message = customMessage || 'Not found';
  }
}

class MethodNotAllowedError extends Error {
  constructor(customMessage) {
    super();
    this.status = 405;
    this.message = customMessage || 'Method not allowed';
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
};

import { StatusCodes } from 'http-status-codes';

class FetchingError extends Error {
  readonly status: StatusCodes;
  readonly isFetchingError: boolean;

  constructor(message: string, status: StatusCodes) {
    super(message);

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchingError);
    }

    this.isFetchingError = true;
    this.status = status;
  }
}

class UnauthorizedError extends Error {
  readonly isAuthorizationError: boolean;

  constructor(message: string) {
    super(message);

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }

    this.isAuthorizationError = true;
  }
}

interface ErrorsInterface {
  FetchingError: (message: string, status: StatusCodes) => Error;
  UnauthorizedError: (message: string) => Error;
}

const errors: ErrorsInterface = {
  FetchingError: (message, status) => new FetchingError(message, status),
  UnauthorizedError: (message) => new UnauthorizedError(message),
};

export default errors;

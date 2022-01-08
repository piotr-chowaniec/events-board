import { StatusCodes } from 'http-status-codes';

import ErrorsFactory from './errorsFactory';
import { ResponseType, RequestParamsType } from './types';

const { UNAUTHORIZED } = StatusCodes;

const GENERAL_ERROR = 'GENERAL ERROR';

type HandleErrors = (
  options: RequestParamsType,
) => (error: ResponseType) => Error;

export const handleErrors: HandleErrors =
  ({ errorMessage, parseResponseErrorMessage = false }) =>
  (error) => {
    const { message, statusCode } = error.response.data;

    if (statusCode === UNAUTHORIZED) {
      throw ErrorsFactory.UnauthorizedError(errorMessage || GENERAL_ERROR);
    }

    if (parseResponseErrorMessage) {
      throw ErrorsFactory.FetchingError(message || errorMessage, statusCode);
    }

    throw ErrorsFactory.FetchingError(
      errorMessage || GENERAL_ERROR,
      statusCode,
    );
  };

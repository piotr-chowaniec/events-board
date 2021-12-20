import { StatusCodes } from 'http-status-codes';

import ErrorsFactory from './errorsFactory';
import { ResponseType, RequestParamsType } from './types';

const { OK, MULTIPLE_CHOICES, UNAUTHORIZED } = StatusCodes;

const GENERAL_ERROR = 'GENERAL ERROR';

type HandleErrors = (
  options: RequestParamsType,
) => (response: ResponseType) => ResponseType | Error;

export const handleErrors: HandleErrors =
  ({ errorMessage, parseResponseErrorMessage = false }) =>
  (response) => {
    const responseSuccessful =
      response.status >= OK && response.status < MULTIPLE_CHOICES;

    if (responseSuccessful) {
      return response;
    }

    if (response.status === UNAUTHORIZED) {
      throw ErrorsFactory.UnauthorizedError(errorMessage || GENERAL_ERROR);
    }

    if (parseResponseErrorMessage) {
      const message = response?.message ? response.message : errorMessage;
      throw ErrorsFactory.FetchingError(message, response.status);
    }

    throw ErrorsFactory.FetchingError(
      errorMessage || GENERAL_ERROR,
      response.status,
    );
  };

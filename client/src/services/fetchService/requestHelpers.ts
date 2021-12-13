import { StatusCodes } from 'http-status-codes';

import ErrorsFactory from './errorsFactory';
import { BodyType, ResponseType } from './types';

const { OK, MULTIPLE_CHOICES, UNAUTHORIZED } = StatusCodes;

const replacer = (key: string, value: string | number | undefined) =>
  typeof value === 'undefined' ? null : value;

export const stringifyJson = (object: BodyType): string =>
  JSON.stringify(object, replacer);

type HandleErrors = (options: {
  errorMessage: string;
  parseResponseErrorMessage?: boolean;
}) => (response: ResponseType) => ResponseType | Error;

export const handleErrors: HandleErrors =
  ({ errorMessage, parseResponseErrorMessage = false }) =>
  (response) => {
    const responseSuccessful =
      response.status >= OK && response.status < MULTIPLE_CHOICES;

    if (responseSuccessful) {
      return response;
    }

    if (response.status === UNAUTHORIZED) {
      throw ErrorsFactory.UnauthorizedError(errorMessage);
    }

    if (parseResponseErrorMessage) {
      const message = response?.message ? response.message : errorMessage;
      throw ErrorsFactory.FetchingError(message, response.status);
    }

    throw ErrorsFactory.FetchingError(errorMessage, response.status);
  };

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

type ApplyQueryStringParams = {
  route: string;
  filters: {
    [key: string]: string | number | null | undefined;
  };
};
type ApplyQueryString = (params: ApplyQueryStringParams) => string;

export const applyQueryString: ApplyQueryString = ({ route, filters }) => {
  if (!filters) {
    return route;
  }

  const queryRoute = Object.keys(filters).reduce((acc, key) => {
    if (typeof filters[key] === 'undefined') {
      return acc;
    }

    if (filters[key] === null) {
      return acc;
    }

    return `${acc}${key}=${filters[key]}&`;
  }, `${route}?`);

  const resultRoute =
    queryRoute[queryRoute.length - 1] === '&'
      ? queryRoute.slice(0, -1)
      : queryRoute;

  return resultRoute;
};

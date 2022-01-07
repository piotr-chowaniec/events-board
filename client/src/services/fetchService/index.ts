import { Method } from 'axios';

import fetchServiceCreator, { postHeaders } from './fetchServiceCreator';
import { handleErrors } from './requestHelpers';
import { storeToken, extractToken } from './tokenUtils';
import { AuthHeaders, BodyType, RequestParamsType } from './types';

export * from './types';

type HttpFetchParams = {
  route: string;
  body?: BodyType;
} & RequestParamsType;

const httpFetch =
  (method: Method) =>
  async ({
    route,
    errorMessage,
    parseResponseErrorMessage,
    body,
  }: HttpFetchParams) => {
    const token = extractToken();

    return fetchServiceCreator(route, method, {
      headers: {
        ...(method.toUpperCase() === 'GET' ? {} : postHeaders),
        ...(token ? { [AuthHeaders.AUTHORIZATION]: token } : {}),
      },
      ...(body ? { data: body } : {}),
    })
      .then(handleErrors({ errorMessage, parseResponseErrorMessage }))
      .then(storeToken())
      .then(({ data } = {}) => data);
  };

export const httpGet = httpFetch('GET');
export const httpPost = httpFetch('POST');
export const httpPatch = httpFetch('PATCH');
export const httpDelete = httpFetch('DELETE');

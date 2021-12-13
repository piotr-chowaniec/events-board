import { Method } from 'axios';

import fetchServiceCreator, { postHeaders } from './fetchServiceCreator';
import { handleErrors, stringifyJson } from './requestHelpers';
import { storeToken, extractToken } from './tokenUtils';
import { AuthHeaders, BodyType } from './types';

type HttpFetchParams = {
  route: string;
  errorMessage: string;
  parseResponseErrorMessage?: boolean;
  body?: BodyType;
};

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
      ...(body ? { body: stringifyJson(body) } : {}),
    })
      .then(handleErrors({ errorMessage, parseResponseErrorMessage }))
      .then(storeToken());
  };

export const httpGet = httpFetch('GET');
export const httpPost = httpFetch('POST');
export const httpPut = httpFetch('PUT');
export const httpDelete = httpFetch('DELETE');

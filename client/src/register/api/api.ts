import {
  httpPost,
  BodyType,
  RequestParamsType,
} from '../../services/fetchService';

export const registerUser =
  (requestParams: RequestParamsType) => (body: BodyType) =>
    httpPost({
      ...requestParams,
      route: '/auth/register',
      body,
    });

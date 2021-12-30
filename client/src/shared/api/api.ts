import {
  httpGet,
  httpPost,
  BodyType,
  RequestParamsType,
} from '../../services/fetchService';

export const loginUser =
  (requestParams: RequestParamsType) => (body: BodyType) =>
    httpPost({
      ...requestParams,
      route: '/auth/login',
      body,
    });

export const fetchUser =
  (requestParams: RequestParamsType) =>
  ({ userId }: BodyType) =>
    httpGet({
      ...requestParams,
      route: `/users/${userId}`,
    });

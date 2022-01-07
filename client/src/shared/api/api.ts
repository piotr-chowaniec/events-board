import {
  httpGet,
  httpPost,
  BodyType,
  RequestParamsType,
  httpPatch,
  httpDelete,
} from '../../services/fetchService';

export const loginUser =
  (requestParams: RequestParamsType) => (body: BodyType) =>
    httpPost({
      ...requestParams,
      route: '/auth/login',
      body,
    });

export const fetchProfileData = (requestParams: RequestParamsType) => () =>
  httpGet({
    ...requestParams,
    route: '/profile',
  });

export const updateUser =
  (requestParams: RequestParamsType) =>
  ({ userId, ...body }: BodyType) =>
    httpPatch({
      ...requestParams,
      route: `/users/${userId}`,
      body,
    });

export const updatePassword =
  (requestParams: RequestParamsType) =>
  ({ userId, ...body }: BodyType) =>
    httpPatch({
      ...requestParams,
      route: `/users/${userId}/password`,
      body,
    });

export const deleteUser =
  (requestParams: RequestParamsType) =>
  ({ userId }: BodyType) =>
    httpDelete({
      ...requestParams,
      route: `/users/${userId}`,
    });

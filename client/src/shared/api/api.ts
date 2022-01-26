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

export const fetchUserName =
  (requestParams: RequestParamsType) =>
  ({ userId }: BodyType) =>
    httpGet({
      ...requestParams,
      route: `/users/${userId}/name`,
    });

export const updateUser =
  (requestParams: RequestParamsType) =>
  ({ userId, firstName, lastName, email, file }: BodyType) => {
    const body = new FormData();
    body.append('firstName', firstName);
    body.append('lastName', lastName);
    body.append('email', email);
    body.append('file', file);

    return httpPatch({
      ...requestParams,
      route: `/users/${userId}`,
      body,
    });
  };

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

export const createParticipant =
  (requestParams: RequestParamsType) => (body: BodyType) =>
    httpPost({
      ...requestParams,
      route: '/participants',
      body,
    });

export const deleteParticipant =
  (requestParams: RequestParamsType) =>
  ({ userId, eventId }: BodyType) =>
    httpDelete({
      ...requestParams,
      route: `/participants/${userId}/${eventId}`,
    });

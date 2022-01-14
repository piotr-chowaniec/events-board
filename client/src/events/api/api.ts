import {
  httpGet,
  httpPatch,
  BodyType,
  RequestParamsType,
} from '../../services/fetchService';

export const fetchEvent =
  (requestParams: RequestParamsType) =>
  ({ eventId }: BodyType) =>
    httpGet({
      ...requestParams,
      route: `/events/${eventId}`,
    });

export const updateEvent =
  (requestParams: RequestParamsType) =>
  ({ eventId, ...body }: BodyType) =>
    httpPatch({
      ...requestParams,
      route: `/events/${eventId}`,
      body,
    });

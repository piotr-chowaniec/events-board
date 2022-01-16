import {
  httpGet,
  httpPost,
  httpPatch,
  BodyType,
  RequestParamsType,
  applyQueryString,
  httpDelete,
} from '../../services/fetchService';
import { EventFiltersType } from '../../shared/types';

export const fetchEvent =
  (requestParams: RequestParamsType) =>
  ({ eventId }: BodyType) =>
    httpGet({
      ...requestParams,
      route: `/events/${eventId}`,
    });

export const fetchEvents =
  (requestParams: RequestParamsType) =>
  ({ filters }: { filters: EventFiltersType }) =>
    httpGet({
      ...requestParams,
      route: applyQueryString({ route: '/events', filters }),
    });

export const createEvent =
  (requestParams: RequestParamsType) => (body: BodyType) =>
    httpPost({
      ...requestParams,
      route: '/events',
      body,
    });

export const updateEvent =
  (requestParams: RequestParamsType) =>
  ({ eventId, ...body }: BodyType) =>
    httpPatch({
      ...requestParams,
      route: `/events/${eventId}`,
      body,
    });

export const updateEventStatus =
  (requestParams: RequestParamsType) =>
  ({ eventId, ...body }: BodyType) =>
    httpPatch({
      ...requestParams,
      route: `/events/${eventId}/status`,
      body,
    });

export const deleteEvent =
  (requestParams: RequestParamsType) =>
  ({ eventId }: BodyType) =>
    httpDelete({
      ...requestParams,
      route: `/events/${eventId}`,
    });

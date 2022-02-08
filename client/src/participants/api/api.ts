import {
  httpGet,
  RequestParamsType,
  applyQueryString,
} from '../../services/fetchService';
import { ParticipantFiltersType } from '../../shared/types';

export const fetchParticipants =
  (requestParams: RequestParamsType) =>
  ({ filters }: { filters: ParticipantFiltersType }) =>
    httpGet({
      ...requestParams,
      route: applyQueryString({ route: '/participants', filters }),
    });

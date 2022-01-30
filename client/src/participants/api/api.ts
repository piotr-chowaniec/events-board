import { httpGet, RequestParamsType } from '../../services/fetchService';

export const fetchParticipants = (requestParams: RequestParamsType) => () =>
  httpGet({
    ...requestParams,
    route: '/participants',
  });

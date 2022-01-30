import { httpGet, RequestParamsType } from '../../services/fetchService';

export const fetchUsers = (requestParams: RequestParamsType) => () =>
  httpGet({
    ...requestParams,
    route: '/users',
  });

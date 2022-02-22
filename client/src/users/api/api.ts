import {
  httpGet,
  RequestParamsType,
  applyQueryString,
} from '../../services/fetchService';
import { UserFiltersType } from '../../shared/types';

export const fetchUsers =
  (requestParams: RequestParamsType) =>
  ({ filters }: { filters: UserFiltersType }) =>
    httpGet({
      ...requestParams,
      route: applyQueryString({ route: '/users', filters }),
    });

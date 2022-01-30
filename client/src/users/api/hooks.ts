import apiActionFactory from '../../shared/api/apiActionFactory';

import { fetchUsers } from './api';

export const useFetchUsers = () =>
  apiActionFactory({
    apiAction: fetchUsers,
  });

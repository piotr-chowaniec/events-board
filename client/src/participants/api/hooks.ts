import apiActionFactory from '../../shared/api/apiActionFactory';

import { fetchParticipants } from './api';

export const useFetchParticipants = () =>
  apiActionFactory({
    apiAction: fetchParticipants,
  });

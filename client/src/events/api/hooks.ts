import apiActionFactory from '../../shared/api/apiActionFactory';

import { fetchEvent, updateEvent } from './api';

export const useFetchEvent = () =>
  apiActionFactory({
    apiAction: fetchEvent,
  });

export const useUpdateEvent = () =>
  apiActionFactory({
    apiAction: updateEvent,
    successMessage: 'Event updated',
    errorMessage: 'Updating event data failed',
  });

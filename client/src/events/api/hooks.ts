import apiActionFactory from '../../shared/api/apiActionFactory';

import {
  fetchEvent,
  fetchEvents,
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
} from './api';

export const useFetchEvent = () =>
  apiActionFactory({
    apiAction: fetchEvent,
  });

export const useFetchEvents = () =>
  apiActionFactory({
    apiAction: fetchEvents,
  });

export const useCreateEvent = () =>
  apiActionFactory({
    apiAction: createEvent,
    successMessage: 'Event created',
    errorMessage: 'Creating event failed',
  });

export const useUpdateEvent = () =>
  apiActionFactory({
    apiAction: updateEvent,
    successMessage: 'Event updated',
    errorMessage: 'Updating event data failed',
  });

export const useUpdateEventStatus = () =>
  apiActionFactory({
    apiAction: updateEventStatus,
    successMessage: 'Event status updated',
    errorMessage: 'Updating event status failed',
  });

export const useDeleteEvent = () =>
  apiActionFactory({
    apiAction: deleteEvent,
    successMessage: 'Event removed',
    errorMessage: 'Removing event failed',
  });

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { useAppSelector } from '../store/hooks';
import { userDataSelector } from '../store/user/selectors';
import Loading from '../displayComponents/loading/loading';
import { EventFiltersType } from '../shared/types';
import routes from '../routes';

import { useFetchEvents, useCreateEvent } from './api/hooks';
import EventCard from './eventCard';
import { EventType } from './types';
import './event.scss';

type EventListParams = {
  isCurrentUser?: boolean;
  eventsLisDescription?: string;
  filters?: EventFiltersType;
};

const EventsList = ({
  isCurrentUser = false,
  eventsLisDescription = 'Events List',
  filters,
}: EventListParams): JSX.Element => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>();

  const { id: userId } = useAppSelector(userDataSelector);

  const { call: fetchEvents, isLoading: isFetchingEvents } = useFetchEvents();
  const { call: createEvent, isLoading: isCreatingEvent } = useCreateEvent();

  const fetchEventsData = useCallback(async () => {
    const events = await fetchEvents({ filters });
    setEvents(events);
  }, [fetchEvents, filters]);

  const onEventCreate = useCallback(async () => {
    const { id: eventId } = await createEvent({ userId });
    navigate(routes.EVENT.compileRoute({ eventId }));
  }, [createEvent, navigate, userId]);

  useEffect(() => {
    fetchEventsData();
  }, [fetchEventsData]);

  const isLoading = isFetchingEvents || isCreatingEvent;

  return (
    <div className="event-list">
      <Loading isLoading={isLoading} />
      <div className="event-list-title">
        <h3>{eventsLisDescription}</h3>
        {isCurrentUser && (
          <Button variant="outline-primary" onClick={onEventCreate}>
            Create new
          </Button>
        )}
      </div>
      <div className="row row-cols-md-2 row-cols-lg-4">
        {events?.length ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <div>Sorry. There are no Events.</div>
        )}
      </div>
    </div>
  );
};

export default EventsList;

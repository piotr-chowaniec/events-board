import React, { useState, useEffect, useCallback } from 'react';
import { Event } from '@common-packages/data-access-layer';

import { useFetchEvents } from '../shared/api/hooks';
import Loading from '../displayComponents/loading/loading';

import EventCard from './eventCard';
import './event.scss';

const EventsList = (): JSX.Element => {
  const [events, setEvents] = useState<Event[]>([]);
  const { call: fetchEvents, isLoading } = useFetchEvents();

  const fetchEventsData = useCallback(async () => {
    const events = (await fetchEvents({})) as Event[];
    setEvents(events);
  }, [fetchEvents]);

  useEffect(() => {
    fetchEventsData();
  }, [fetchEventsData]);

  return (
    <div className="event-list">
      <Loading isLoading={isLoading} />
      <div className="row row-cols-md-2 row-cols-lg-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;

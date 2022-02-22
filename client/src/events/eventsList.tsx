import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';

import { useAppSelector } from '../store/hooks';
import { userDataSelector } from '../store/user/selectors';
import Loading from '../displayComponents/loading/loading';
import useViewMode from '../shared/hooks/useViewMode.hook';
import usePagination from '../shared/hooks/usePagination.hook';
import { EventFiltersType } from '../shared/types';
import routes from '../routes';

import { useFetchEvents, useCreateEvent } from './api/hooks';
import EventCard from './eventCard';
import EventListItem from './eventListItem';
import { EventType } from './types';
import styles from './styles.module.scss';

type EventListParams = {
  isCurrentUser?: boolean;
  eventsLisDescription?: string;
  filters?: EventFiltersType;
};

const EventsList = ({
  isCurrentUser = false,
  eventsLisDescription = 'Events',
  filters,
}: EventListParams): JSX.Element => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>();
  const [count, setCount] = useState(0);
  const { ViewModeButtons, isListView, isDefaultView, isLargeView } =
    useViewMode();
  const { maxItems, currentPage, PaginationButtons } = usePagination({
    count,
  });

  const { id: userId } = useAppSelector(userDataSelector);

  const { call: fetchEvents, isLoading: isFetchingEvents } = useFetchEvents();
  const { call: createEvent, isLoading: isCreatingEvent } = useCreateEvent();

  const fetchEventsData = useCallback(async () => {
    const { count, events } = await fetchEvents({
      filters: {
        ...filters,
        skip: (currentPage - 1) * maxItems,
        take: maxItems,
      },
    });
    setCount(count);
    setEvents(events);
  }, [fetchEvents, filters, currentPage, maxItems]);

  const onEventCreate = useCallback(async () => {
    const { id: eventId } = await createEvent({ userId });
    navigate(routes.EVENT.compileRoute({ eventId }));
  }, [createEvent, navigate, userId]);

  useEffect(() => {
    fetchEventsData();
  }, [fetchEventsData]);

  const className: string = classnames(styles.eventListContent, {
    ['row row-cols-md-2 row-cols-lg-4']: isDefaultView,
    ['row row-cols-md-1 row-cols-lg-2']: isLargeView,
  });

  const isLoading = isFetchingEvents || isCreatingEvent;

  return (
    <div className={styles.eventList} data-testid="event-list">
      <Loading isLoading={isLoading} />
      <div className={styles.eventListTitle}>
        <h3>{eventsLisDescription}</h3>
        <div className={styles.eventListButtons}>
          <ViewModeButtons />
          {isCurrentUser && (
            <Button
              variant="outline-dark"
              onClick={onEventCreate}
              data-testid="create-new-event-button"
            >
              Create new
            </Button>
          )}
        </div>
      </div>
      <div className={className}>
        {events?.length ? (
          events.map((event) =>
            isListView ? (
              <EventListItem key={event.id} event={event} />
            ) : (
              <EventCard key={event.id} event={event} />
            ),
          )
        ) : (
          <div>Sorry. There are no Events.</div>
        )}
      </div>
      <PaginationButtons />
    </div>
  );
};

export default EventsList;

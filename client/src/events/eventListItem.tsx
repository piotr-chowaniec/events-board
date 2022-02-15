import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

import {
  transformToDate,
  SHORT_DATE_TIME_FORMAT,
} from '../displayComponents/formatters/date';
import EventImage from '../displayComponents/imageComponent/eventImage';
import { getIsPublished, pluralize } from '../shared/helpers';
import routes from '../routes';

import { EventType } from './types';
import styles from './styles.module.scss';

type EventListItemParams = {
  event: EventType;
};

const EventListItem = ({ event }: EventListItemParams): JSX.Element => {
  const navigate = useNavigate();

  const onEventClick = useCallback(() => {
    navigate(routes.EVENT.compileRoute({ eventId: event.id }));
  }, [navigate, event.id]);

  return (
    <div className={styles.eventListItem} onClick={onEventClick}>
      <div className={styles.eventListImageWrapper}>
        <EventImage
          className={styles.eventListImage}
          image={event?.image}
          width={300}
        />
        {!getIsPublished(event) && (
          <div className={styles.eventListImgOverlay}>
            <Badge pill bg="warning" text="dark">
              {event.status}
            </Badge>
          </div>
        )}
      </div>
      <div className={styles.eventListItemBody}>
        <h5>{event.title}</h5>
        <p>{event.shortDescription}</p>
        <div className={styles.eventDate}>
          {transformToDate(String(event.eventDate), SHORT_DATE_TIME_FORMAT)}
        </div>
        <div className="pt-2">
          {pluralize(event._count.participants, 'Participant')}
          {`: `}
          {event._count.participants}
        </div>
      </div>
    </div>
  );
};

export default EventListItem;

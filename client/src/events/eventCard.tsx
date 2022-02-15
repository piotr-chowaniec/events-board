import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

import {
  transformToDate,
  SHORT_DATE_TIME_FORMAT,
} from '../displayComponents/formatters/date';
import { getEventImageSrc } from '../displayComponents/imageComponent/getImageSrc';
import { getIsPublished, pluralize } from '../shared/helpers';
import routes from '../routes';

import { EventType } from './types';
import styles from './styles.module.scss';

type EventCardParams = {
  event: EventType;
};

const EventCard = ({ event }: EventCardParams): JSX.Element => {
  const navigate = useNavigate();

  const onEventCardClick = useCallback(() => {
    navigate(routes.EVENT.compileRoute({ eventId: event.id }));
  }, [navigate, event.id]);

  const imageSrc = getEventImageSrc({
    image: event.image,
  });

  return (
    <Card className={styles.eventCard} onClick={onEventCardClick}>
      <div className={styles.eventCardWrapper}>
        <div className={styles.eventCardImageWrapper}>
          <Card.Img src={imageSrc} className={styles.eventCardImage} />
          {!getIsPublished(event) && (
            <Card.ImgOverlay>
              <div className={styles.eventCardImageOverlay}>
                <Badge pill bg="warning" text="dark">
                  {event.status}
                </Badge>
              </div>
            </Card.ImgOverlay>
          )}
        </div>
        <Card.Body className={styles.eventCardBody}>
          <div className={styles.eventCardDate}>
            {transformToDate(String(event.eventDate), SHORT_DATE_TIME_FORMAT)}
          </div>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>
            {event.shortDescription}
            <div className="pt-2">
              {pluralize(event._count.participants, 'Participant')}
              {`: `}
              {event._count.participants}
            </div>
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default EventCard;

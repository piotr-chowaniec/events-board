import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

import {
  transformToDate,
  SHORT_DATE_TIME_FORMAT,
} from '../displayComponents/formatters/date';
import { getEventImageSrc } from '../displayComponents/imageComponent/getImageSrc';
import { getIsPublished } from '../shared/helpers';
import routes from '../routes';

import { EventType } from './types';

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
    <Card className="event-card" onClick={onEventCardClick}>
      <div className="event-card-wrapper">
        <div className="event-card-image-wrapper">
          <Card.Img src={imageSrc} className="event-card-image" />
          {!getIsPublished(event) && (
            <Card.ImgOverlay>
              <div className="event-card-image-overlay">
                <Badge pill bg="warning" text="dark">
                  {event.status}
                </Badge>
              </div>
            </Card.ImgOverlay>
          )}
        </div>
        <Card.Body className="event-card-body">
          <div className="event-card-date">
            {transformToDate(String(event.eventDate), SHORT_DATE_TIME_FORMAT)}
          </div>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.shortDescription}</Card.Text>
          {`Participants: `}
          {event._count.participants}
        </Card.Body>
      </div>
    </Card>
  );
};

export default EventCard;

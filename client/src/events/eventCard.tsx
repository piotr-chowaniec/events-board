import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Event } from '@common-packages/data-access-layer';

import eventDefaultImage from '../displayComponents/images/event.jpeg';
import routes from '../routes';

type EventCardParams = {
  event: Event;
};

const EventCard = ({ event }: EventCardParams): JSX.Element => {
  const navigate = useNavigate();

  const onEventCardClick = useCallback(() => {
    navigate(routes.EVENT.compileRoute({ eventId: event.id }));
  }, [navigate, event.id]);

  return (
    <Card className="event-card" onClick={onEventCardClick}>
      <div className="event-card-wrapper">
        <Card.Img src={eventDefaultImage} className="event-card-image" />
        <Card.Body className="event-card-body">
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default EventCard;

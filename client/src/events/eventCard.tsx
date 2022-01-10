import React from 'react';
import { Card } from 'react-bootstrap';
import { Event } from '@common-packages/data-access-layer';

import eventDefaultImage from '../displayComponents/images/event.jpeg';

type EventCardParams = {
  event: Event;
};

const EventCard = ({ event }: EventCardParams): JSX.Element => {
  return (
    <Card className="event-card">
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

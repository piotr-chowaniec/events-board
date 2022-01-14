import React from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Event, User } from '@common-packages/data-access-layer';
import { Button } from 'react-bootstrap';

import {
  transformToDate,
  SHORT_DATE_TIME_FORMAT,
} from '../displayComponents/formatters/date';
import eventDefaultImage from '../displayComponents/images/event.jpeg';
import routes from '../routes';

type EventDetailsProps = {
  event: Event & { user: User };
  enableEditMode: () => void;
  isAllowedToEdit: boolean;
};

const EventDetails = ({
  event,
  enableEditMode,
  isAllowedToEdit,
}: EventDetailsProps): JSX.Element => (
  <>
    <div
      className="event-header"
      style={{ backgroundImage: `url(${eventDefaultImage}` }}
    >
      <div className="event-details">
        <h2 className="event-title">{event.title}</h2>
        <h4>{event.shortDescription}</h4>
        <p>{transformToDate(String(event.eventDate))}</p>
        <span>
          {`Created by: `}
          <Link
            to={routes.USER_EVENTS.compileRoute({
              userId: event.userId,
            })}
            className="custom-link"
          >
            {event.user.firstName} {event.user.lastName}
          </Link>
        </span>
        <span className="last-updated">
          {`Last updated: `}
          {transformToDate(String(event.updatedAt), SHORT_DATE_TIME_FORMAT)}
        </span>
      </div>
      {isAllowedToEdit && (
        <div className="event-edit-buttons">
          <Button onClick={enableEditMode}>Edit Event Details</Button>
        </div>
      )}
    </div>
    <div className="event-description">
      {event.description && Parser(event.description)}
    </div>
  </>
);

export default EventDetails;

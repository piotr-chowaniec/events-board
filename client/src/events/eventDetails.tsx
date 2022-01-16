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
import useModal from '../shared/hooks/useModal.hook';
import { getIsDraft } from '../shared/helpers';
import { EVENT_STATUS } from '../shared/types';
import routes from '../routes';

const ModalBody = (
  <>
    <h5>Dear User. Be careful.</h5>
    <p>
      Are you sure you want to remove your event? Event removal can&apos;t be
      undone.
    </p>
  </>
);

type EventDetailsProps = {
  event: Event & { user: User };
  enableEditMode: () => void;
  isAllowedToEdit: boolean;
  onEventStatusUpdate: (newStatus: EVENT_STATUS) => Promise<void>;
  onEventDelete: () => Promise<void>;
};

const EventDetails = ({
  event,
  enableEditMode,
  isAllowedToEdit,
  onEventStatusUpdate,
  onEventDelete,
}: EventDetailsProps): JSX.Element => {
  const { Modal, showModal } = useModal();

  return (
    <>
      <div
        className="event-header"
        style={{ backgroundImage: `url(${eventDefaultImage}` }}
      >
        <div className="event-details">
          <div className="event-wrapper">
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
        </div>
        {isAllowedToEdit && (
          <div className="event-edit-buttons">
            {getIsDraft(event) && (
              <Button
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => onEventStatusUpdate(EVENT_STATUS.PUBLISHED)}
                variant="success"
              >
                Publish
              </Button>
            )}
            <Button onClick={enableEditMode}>Edit</Button>
            <Button onClick={showModal} variant="danger">
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="event-description">
        {event.description && Parser(event.description)}
      </div>
      <Modal
        title="Remove Event"
        body={ModalBody}
        confirmButtonDescription="Remove Event"
        onConfirm={onEventDelete}
      />
    </>
  );
};

export default EventDetails;

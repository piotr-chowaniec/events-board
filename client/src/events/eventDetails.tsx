import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Button } from 'react-bootstrap';

import {
  transformToDate,
  SHORT_DATE_TIME_FORMAT,
} from '../displayComponents/formatters/date';
import ParticipationButton from '../displayComponents/participationButton/participationButton';
import { getEventImageSrc } from '../displayComponents/imageComponent/getImageSrc';
import FaIcon from '../displayComponents/faIcon/faIcon';
import useModal from '../shared/hooks/useModal.hook';
import { getIsDraft } from '../shared/helpers';
import { EVENT_STATUS } from '../shared/types';
import routes from '../routes';

import { EventType } from './types';

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
  event: EventType;
  isOwner: boolean;
  isGoing: boolean;
  isAllowedToEdit: boolean;
  enableEditMode: () => void;
  fetchEventData: () => void;
  onEventStatusUpdate: (newStatus: EVENT_STATUS) => Promise<void>;
  onEventDelete: () => Promise<void>;
};

const EventDetails = ({
  event,
  isOwner,
  isGoing,
  isAllowedToEdit,
  enableEditMode,
  fetchEventData,
  onEventStatusUpdate,
  onEventDelete,
}: EventDetailsProps): JSX.Element => {
  const { Modal, showModal } = useModal();

  const imageSrc = getEventImageSrc({
    image: event?.image,
  });

  const onDeleteClick = useCallback(() => {
    showModal();
  }, [showModal]);

  return (
    <>
      <div
        className="event-header event-image"
        style={{ backgroundImage: `url(${imageSrc}` }}
      >
        <div className="row event-details">
          <div className="col-md-9 col-lg-7 col-xl-7">
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
              <span>
                {`Participants: `}
                {event._count.participants}
              </span>
              <span className="last-updated">
                {`Last updated: `}
                {transformToDate(
                  String(event.updatedAt),
                  SHORT_DATE_TIME_FORMAT,
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="event-edit-buttons">
          <ParticipationButton
            isGoing={isGoing}
            isOwner={isOwner}
            fetchEventData={fetchEventData}
          />
          {isAllowedToEdit && (
            <>
              {getIsDraft(event) && (
                <Button
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={() => onEventStatusUpdate(EVENT_STATUS.PUBLISHED)}
                  variant="success"
                >
                  Publish
                </Button>
              )}
              <Button onClick={enableEditMode}>
                <FaIcon icon="edit" size={16} />
                Edit
              </Button>
              <Button onClick={onDeleteClick} variant="danger">
                <FaIcon icon="trash" size={16} />
                Delete
              </Button>
            </>
          )}
        </div>
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

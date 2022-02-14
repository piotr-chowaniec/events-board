import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import {
  transformToDate,
  SHORT_DATE_TIME_FORMAT,
} from '../displayComponents/formatters/date';
import UserImage from '../displayComponents/imageComponent/userImage';
import EventImage from '../displayComponents/imageComponent/eventImage';
import routes from '../routes';

import { ParticipantType } from './types';

type ParticipantItemType = {
  participant: ParticipantType;
  onDeleteClick: (participant: ParticipantType) => void;
};
const ParticipantItem = ({
  participant,
  onDeleteClick,
}: ParticipantItemType): JSX.Element => (
  <tr>
    <td>
      <UserImage
        className="participant-list-image"
        image={participant?.user?.image}
        width={50}
      />
    </td>
    <td>{participant?.user?.email}</td>
    <td>{participant?.user?.firstName}</td>
    <td>{participant?.user?.lastName}</td>
    <td>
      <EventImage
        className="participant-list-image"
        image={participant?.event?.image}
        width={100}
      />
    </td>
    <td>
      <Link
        to={routes.EVENT.compileRoute({
          eventId: participant?.eventId,
        })}
        className="custom-link"
      >
        {participant?.event?.title}
      </Link>
    </td>
    <td>
      {transformToDate(
        String(participant?.event?.eventDate),
        SHORT_DATE_TIME_FORMAT,
      )}
    </td>
    <td>
      <Button
        variant="outline-danger"
        size="sm"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => onDeleteClick(participant)}
      >
        Delete
      </Button>
    </td>
  </tr>
);

export default ParticipantItem;

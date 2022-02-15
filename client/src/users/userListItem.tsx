import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import {
  transformToDate,
  SHORT_DATE_TIME_FORMAT,
} from '../displayComponents/formatters/date';
import UserImage from '../displayComponents/imageComponent/userImage';
import { pluralize } from '../shared/helpers';
import routes from '../routes';

import { UserType } from './types';
import styles from './users.module.scss';

type UserItemType = {
  user: UserType;
  currentUserId: string;
  onEditClick: (user: UserType) => void;
  onDeleteClick: (user: UserType) => void;
};
const UserItem = ({
  user,
  currentUserId,
  onEditClick,
  onDeleteClick,
}: UserItemType): JSX.Element => {
  const isCurrentUser = user.id === currentUserId;

  return (
    <tr>
      <td>
        <UserImage
          className={styles.userListImage}
          image={user?.image}
          width={50}
        />
      </td>
      <td>{user.email}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>
        <Link
          to={routes.USER_EVENTS.compileRoute({
            userId: user.id,
          })}
          className="custom-link"
        >
          {user._count.events} {pluralize(user._count.events, 'Event')}
        </Link>
      </td>
      <td>
        <Link
          to={routes.PARTICIPANT_EVENTS.compileRoute({
            userId: user.id,
          })}
          className="custom-link"
        >
          {user._count.participants}{' '}
          {pluralize(user._count.participants, 'Event')}
        </Link>
      </td>
      <td>{user.role}</td>
      <td>{transformToDate(String(user.createdAt), SHORT_DATE_TIME_FORMAT)}</td>
      <td>
        {!isCurrentUser && (
          <Button
            variant="outline-primary"
            size="sm"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => onEditClick(user)}
          >
            Edit
          </Button>
        )}
      </td>
      <td>
        {!isCurrentUser && (
          <Button
            variant="outline-danger"
            size="sm"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => onDeleteClick(user)}
          >
            Delete
          </Button>
        )}
      </td>
    </tr>
  );
};

export default UserItem;

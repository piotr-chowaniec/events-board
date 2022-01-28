import React, { useEffect, useCallback, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import Warning from '../displayComponents/warning/warning';
import { useFetchUserName } from '../shared/api/hooks';
import { useAppSelector } from '../store/hooks';
import { userDataSelector, isAdminSelector } from '../store/user/selectors';
import routes from '../routes';

import EventsList from './eventsList';
import { getFilters } from './helpers';

const ParticipantEvents = () => {
  const { userId } = useParams();
  const [initialized, setInitialized] = useState(false);
  const [eventsListDescription, setDescription] = useState('');

  const { id: currentUserId } = useAppSelector(userDataSelector);
  const isAdmin = useAppSelector(isAdminSelector);
  const isCurrentUser = userId === currentUserId;

  const { call: fetchUserName } = useFetchUserName();

  const getDescription = useCallback(async () => {
    if (isCurrentUser) {
      setDescription('Events You Participate');
    } else if (!userId) {
      setDescription('');
    } else {
      const { firstName, lastName } = await fetchUserName({ userId });
      const description = firstName
        ? `Events ${firstName} ${lastName} Participate`
        : '';
      setDescription(description);
    }
    setInitialized(true);
  }, [fetchUserName, isCurrentUser, userId]);

  useEffect(() => {
    getDescription();
  }, [getDescription]);

  return (
    <div className="container">
      {initialized &&
        (isCurrentUser || isAdmin ? (
          <>
            <EventsList
              isCurrentUser={isCurrentUser}
              eventsLisDescription={eventsListDescription}
              filters={getFilters({ participant: userId })}
            />
            <Warning
              isWarning={!eventsListDescription}
              warningMessage={`Sorry. User with ID: ${userId} does not exist`}
            />
          </>
        ) : (
          <Navigate to={routes.MAIN.PATH} />
        ))}
    </div>
  );
};

export default ParticipantEvents;

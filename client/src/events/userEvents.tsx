import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import Warning from '../displayComponents/warning/warning';
import EventsList from '../events/eventsList';
import { useFetchUserName } from '../shared/api/hooks';
import { useAppSelector } from '../store/hooks';
import { userDataSelector, isAdminSelector } from '../store/user/selectors';

import { getFilters } from './helpers';

const UserEvents = () => {
  const { userId } = useParams();
  const [initialized, setInitialized] = useState(false);
  const [eventsListDescription, setDescription] = useState('');

  const { id: currentUserId } = useAppSelector(userDataSelector);
  const isAdmin = useAppSelector(isAdminSelector);
  const isCurrentUser = userId === currentUserId;

  const { call: fetchUserName } = useFetchUserName();

  const getDescription = useCallback(async () => {
    if (isCurrentUser) {
      setDescription('Your Events');
    } else if (!userId) {
      setDescription('');
    } else {
      const { firstName, lastName } = await fetchUserName({ userId });
      const description = firstName ? `${firstName} ${lastName} Events` : '';
      setDescription(description);
    }
    setInitialized(true);
  }, [fetchUserName, isCurrentUser, userId]);

  useEffect(() => {
    getDescription();
  }, [getDescription]);

  return (
    <div className="container full-height auto-fill">
      {initialized && (
        <>
          <EventsList
            isCurrentUser={isCurrentUser}
            eventsLisDescription={eventsListDescription}
            filters={getFilters({ isAdmin, isCurrentUser, userId })}
          />
          <Warning
            isWarning={!eventsListDescription}
            warningMessage={`Sorry. User with ID: ${userId} does not exist`}
          />
        </>
      )}
    </div>
  );
};

export default UserEvents;

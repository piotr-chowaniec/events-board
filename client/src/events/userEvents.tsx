import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      setDescription(`${firstName} ${lastName} Events`);
    }
    setInitialized(true);
  }, [fetchUserName, isCurrentUser, userId]);

  useEffect(() => {
    getDescription();
  }, [getDescription]);

  return (
    <div className="container full-height">
      {initialized && (
        <EventsList
          isCurrentUser={isCurrentUser}
          eventsLisDescription={eventsListDescription}
          filters={getFilters({ isAdmin, isCurrentUser, userId })}
        />
      )}
    </div>
  );
};

export default UserEvents;

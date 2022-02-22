import React from 'react';

import { useAppSelector } from '../store/hooks';
import { isAdminSelector } from '../store/user/selectors';

import EventsList from './eventsList';

const AllEvents = (): JSX.Element => {
  const isAdmin = useAppSelector(isAdminSelector);

  return (
    <div className="container full-height auto-fill">
      <EventsList isCurrentUser={isAdmin} eventsLisDescription="All Events" />
    </div>
  );
};

export default AllEvents;

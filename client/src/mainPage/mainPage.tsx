import React from 'react';

import EventsList from '../events/eventsList';
import { EVENT_STATUS } from '../shared/types';
import { useAppSelector } from '../store/hooks';
import { isAuthenticatedSelector } from '../store/user/selectors';

import MainPageHeader from './mainPageHeader';
import styles from './mainPage.module.scss';

const MainPage = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  return (
    <div className={`container full-height ${styles.mainPage}`}>
      <MainPageHeader />
      <EventsList
        isCurrentUser={isAuthenticated}
        filters={{ status: EVENT_STATUS.PUBLISHED }}
      />
    </div>
  );
};

export default MainPage;

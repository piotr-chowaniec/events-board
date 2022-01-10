import React from 'react';

import EventsList from '../events/eventsList';

import MainPageHeader from './mainPageHeader';

import './mainPage.scss';

const MainPage = () => (
  <div className="container full-height main-page">
    <MainPageHeader />
    <EventsList />
  </div>
);

export default MainPage;

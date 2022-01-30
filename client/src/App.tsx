import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Routes, Route, Navigate } from 'react-router-dom';

import fetchUserData from './shared/hooks/fetchUserData.hook';
import Authenticated from './authentication/authenticated';
import MainPage from './mainPage/mainPage';
import Login from './login/login';
import Register from './register/register';
import Profile from './profile/profile';
import PasswordChange from './profile/passwordChange';
import Event from './events/event';
import UserEvents from './events/userEvents';
import ParticipantEvents from './events/participantEvents';
import AllEvents from './events/allEvents';
import AllUsers from './users/allUsers';
import Layout from './layout';
import routes from './routes';

const App = () => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  fetchUserData();

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.MAIN.PATH} element={<MainPage />} />
          <Route path={routes.LOGIN.PATH} element={<Login />} />
          <Route path={routes.REGISTER.PATH} element={<Register />} />
          <Route path={routes.EVENT.PATH} element={<Event />} />
          <Route path={routes.USER_EVENTS.PATH} element={<UserEvents />} />
          <Route element={<Authenticated />}>
            <Route path={routes.PROFILE.PATH} element={<Profile />} />
            <Route path={routes.PASSWORD.PATH} element={<PasswordChange />} />
            <Route
              path={routes.PARTICIPANT_EVENTS.PATH}
              element={<ParticipantEvents />}
            />
          </Route>
          <Route element={<Authenticated isAdminRoute />}>
            <Route path={routes.ALL_EVENTS.PATH} element={<AllEvents />} />
            <Route path={routes.ALL_USERS.PATH} element={<AllUsers />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={routes.MAIN.PATH} />} />
      </Routes>
    </>
  );
};

export default App;

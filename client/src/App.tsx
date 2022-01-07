import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Routes, Route } from 'react-router-dom';

import fetchUserData from './shared/hooks/fetchUserData.hook';
import MainPage from './mainPage/mainPage';
import Register from './register/register';
import Profile from './profile/profile';
import PasswordChange from './profile/passwordChange';
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
          <Route path={routes.REGISTER.PATH} element={<Register />} />
          <Route path={routes.PROFILE.PATH} element={<Profile />} />
          <Route path={routes.PASSWORD.PATH} element={<PasswordChange />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

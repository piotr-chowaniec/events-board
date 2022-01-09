import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Routes, Route } from 'react-router-dom';

import fetchUserData from './shared/hooks/fetchUserData.hook';
import Authenticated from './shared/authentication/authenticated';
import MainPage from './mainPage/mainPage';
import Login from './login/login';
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
          <Route path={routes.LOGIN.PATH} element={<Login />} />
          <Route path={routes.REGISTER.PATH} element={<Register />} />
          <Route element={<Authenticated />}>
            <Route path={routes.PROFILE.PATH} element={<Profile />} />
            <Route path={routes.PASSWORD.PATH} element={<PasswordChange />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

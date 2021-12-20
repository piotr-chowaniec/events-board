import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './register/register.component';
import routes from './routes';
import MainPage from './mainPage/mainPage.container';
import Layout from './layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.MAIN.PATH} element={<MainPage />} />
          <Route path={routes.REGISTER.PATH} element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

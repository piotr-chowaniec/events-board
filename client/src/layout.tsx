import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './navbar/navbar.container';

const Layout = () => {
  return (
    <div id="events-board">
      <Navbar
        isAuthenticated={false}
        isAdmin={false}
        userDisplayName="Piotr Chowaniec"
      />
      <Outlet />
    </div>
  );
};

export default Layout;

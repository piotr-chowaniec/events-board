import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './navbar/navbar';

const Layout = () => {
  return (
    <div id="events-board">
      <Navbar />
      <ToastContainer className="toast-top-right" />
      <Outlet />
    </div>
  );
};

export default Layout;

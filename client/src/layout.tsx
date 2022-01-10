import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './navbar/navbar';
import Footer from './footer/footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer className="toast-top-right" />
      <section id="events-board">
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Layout;

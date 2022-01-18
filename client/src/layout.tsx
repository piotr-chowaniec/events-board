import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from './store/hooks';
import { userInitializedSelector } from './store/user/selectors';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Loading from './displayComponents/loading/loading';

const Layout = () => {
  const isInitialized = useAppSelector(userInitializedSelector);

  return (
    <>
      <Navbar />
      <ToastContainer className="toast-top-right" />
      <section id="events-board">
        <div className="content">
          {isInitialized ? <Outlet /> : <Loading isLoading />}
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Layout;

import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import routes from '../routes';
import { resetToken } from '../services/fetchService/tokenUtils';

import NavbarLogin from './navbarLogin.component';
import NavbarAuthenticated from './navbarAuthenticated.component';
import { LoginFormValues } from './types';

type MenuNavbar = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userDisplayName: string | null;
};

const MenuNavbar = ({
  isAuthenticated,
  isAdmin,
  userDisplayName,
}: MenuNavbar): JSX.Element => {
  const navigate = useNavigate();

  const handleUserLogin = useCallback(
    async (values: LoginFormValues) => {
      // await loginUser(values);
      // const userData = await fetchProfileData();
      // setUserData(userData);
      console.log(values);
      navigate(routes.MAIN.PATH);
    },
    [navigate],
  );

  const handleUserLogout = useCallback(() => {
    resetToken();
    // setUserData();
    // addSuccessNotification('Successfully logged out');
    navigate(routes.MAIN.PATH);
  }, [navigate]);

  const renderNavbarButtons = useCallback(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        return (
          <>
            <Nav.Item>
              <Link to={routes.MAIN.PATH} className="nav-link">
                Event Applications List
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={routes.MAIN.PATH} className="nav-link">
                Users List
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={routes.MAIN.PATH} className="nav-link">
                Your Application
              </Link>
            </Nav.Item>
          </>
        );
      }
      return (
        <Nav.Item>
          <Link to={routes.MAIN.PATH} className="nav-link">
            Your Application
          </Link>
        </Nav.Item>
      );
    }

    return null;
  }, [isAdmin, isAuthenticated]);

  const renderUserDropdown = useCallback(
    () =>
      isAuthenticated ? (
        <NavbarAuthenticated
          handleUserLogout={handleUserLogout}
          userDisplayName={userDisplayName}
        />
      ) : (
        <NavbarLogin handleUserLogin={handleUserLogin} />
      ),
    [handleUserLogin, handleUserLogout, isAuthenticated, userDisplayName],
  );

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      fixed="top"
      className="navbar"
    >
      <Container>
        <Link to={routes.MAIN.PATH} className="navbar-brand mr-5">
          Events<strong>Board</strong>
        </Link>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav>{renderNavbarButtons()}</Nav>
          <Nav>{renderUserDropdown()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;

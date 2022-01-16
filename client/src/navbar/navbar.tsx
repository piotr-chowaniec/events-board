import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  userDataSelector,
  isAuthenticatedSelector,
  isAdminSelector,
  userDisplayNameSelector,
} from '../store/user/selectors';
import { setUserData, initialState } from '../store/user/userSlice';
import { useFetchProfileData, useLogin } from '../shared/api/hooks';
import { addSuccessNotification } from '../shared/notifications';
import { resetToken } from '../services/fetchService/tokenUtils';
import { LoginFormValues } from '../shared/types';
import routes from '../routes';

import NavbarLogin from './navbarLogin';
import NavbarAuthenticated from './navbarAuthenticated';

const MenuNavbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id: userId } = useAppSelector(userDataSelector);
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const isAdmin = useAppSelector(isAdminSelector);
  const userDisplayName = useAppSelector(userDisplayNameSelector);

  const { call: loginUser, isLoading: isLogging } = useLogin();
  const { call: fetchProfileData, isLoading: isFetchProfileLoading } =
    useFetchProfileData();

  const handleUserLogin = useCallback(
    async (user: LoginFormValues) => {
      await loginUser(user);
      const userData = await fetchProfileData({});
      dispatch(setUserData(userData));
    },
    [dispatch, loginUser, fetchProfileData],
  );

  const handleUserLogout = useCallback(() => {
    resetToken();
    dispatch(setUserData(initialState));
    addSuccessNotification('Successfully logged out', {
      autoClose: 2000,
    });
    navigate(routes.MAIN.PATH);
  }, [dispatch, navigate]);

  const isLoading = isLogging || isFetchProfileLoading;

  const renderNavbarButtons = useCallback(() => {
    if (!isAuthenticated) {
      return null;
    }

    if (isAdmin) {
      return (
        <>
          <Nav.Item>
            <Link
              to={routes.USER_EVENTS.compileRoute({
                userId,
              })}
              className="nav-link"
            >
              Your Events
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={routes.MAIN.PATH} className="nav-link">
              Events List
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={routes.MAIN.PATH} className="nav-link">
              Users List
            </Link>
          </Nav.Item>
        </>
      );
    }

    return (
      <Nav.Item>
        <Nav.Item>
          <Link
            to={routes.USER_EVENTS.compileRoute({
              userId,
            })}
            className="nav-link"
          >
            Your Events
          </Link>
        </Nav.Item>
      </Nav.Item>
    );
  }, [isAdmin, isAuthenticated, userId]);

  const renderUserDropdown = useCallback(
    () =>
      isAuthenticated ? (
        <NavbarAuthenticated
          handleUserLogout={handleUserLogout}
          userDisplayName={userDisplayName}
        />
      ) : (
        <NavbarLogin handleUserLogin={handleUserLogin} isLoading={isLoading} />
      ),
    [
      handleUserLogin,
      handleUserLogout,
      isAuthenticated,
      userDisplayName,
      isLoading,
    ],
  );

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Container>
        <Link to={routes.MAIN.PATH} className="navbar-brand me-5">
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

import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import {
  isAuthenticatedSelector,
  isAdminSelector,
} from '../../store/user/selectors';
import routes from '../../routes';

type AuthenticatedParams = {
  isAdminRoute?: boolean;
};

const Authenticated = ({ isAdminRoute }: AuthenticatedParams): JSX.Element => {
  const location = useLocation();

  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const isAdmin = useAppSelector(isAdminSelector);

  if (!isAuthenticated || (isAdminRoute && !isAdmin)) {
    return (
      <Navigate to={routes.LOGIN.PATH} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export default Authenticated;

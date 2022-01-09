import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { NavDropdown } from 'react-bootstrap';
import { userSchemas } from '@common-packages/validators';

import Loading from '../displayComponents/loading/loading';
import { LoginFormValues } from '../shared/types';
import routes from '../routes';

import NavbarLoginForm from './navbarLoginForm';

const login = {
  email: '',
  password: '',
};

type NavbarLoginParams = {
  handleUserLogin: (values: LoginFormValues) => void;
  isLoading: boolean;
};

const NavbarLogin = ({
  handleUserLogin,
  isLoading,
}: NavbarLoginParams): JSX.Element => (
  <NavDropdown id="navbarLogin" title="Login/Register" align="end">
    <div className="px-4 py-3">
      <Loading isLoading={isLoading} loadingMessage="Logging..." />
      <Formik
        initialValues={login}
        validationSchema={userSchemas.loginUserSchema}
        component={NavbarLoginForm}
        onSubmit={handleUserLogin}
      />
    </div>
    <NavDropdown.Divider />
    <Link className="dropdown-item" to={routes.REGISTER.PATH}>
      New around here? Register!
    </Link>
  </NavDropdown>
);

export default NavbarLogin;

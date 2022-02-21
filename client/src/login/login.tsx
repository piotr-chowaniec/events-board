import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import FaIcon from '../displayComponents/faIcon/faIcon';
import FullPageCard from '../displayComponents/fullPageCard/fullPageCard';
import { useAppDispatch } from '../store/hooks';
import { setUserData } from '../store/user/userSlice';
import { useFetchProfileData, useLogin } from '../shared/api/hooks';
import { LoginFormValues } from '../shared/types';
import routes from '../routes';

import LoginForm from './loginForm';

const login = {
  email: '',
  password: '',
};

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from: Location };

  const from = state?.from?.pathname || routes.MAIN.PATH;

  const { call: loginUser, isLoading: isLogging } = useLogin();
  const { call: fetchProfileData, isLoading: isFetchProfileLoading } =
    useFetchProfileData();

  const handleUserLogin = useCallback(
    async (user: LoginFormValues) => {
      await loginUser(user);
      const userData = await fetchProfileData({});
      dispatch(setUserData(userData));
      navigate(from, { replace: true });
    },
    [dispatch, loginUser, fetchProfileData, navigate, from],
  );

  const isLoading = isLogging || isFetchProfileLoading;

  return (
    <FullPageCard isLoading={isLoading} dataTestid="login">
      <FaIcon icon="user" size={100} />
      <h2 className="card-title my-3">Login</h2>
      <div className="text-start">
        <Formik
          initialValues={login}
          validationSchema={userSchemas.loginUserSchema}
          component={LoginForm}
          onSubmit={handleUserLogin}
        />
      </div>
    </FullPageCard>
  );
};

export default Login;

import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import FaIcon from '../displayComponents/faIcon/faIcon';
import Loading from '../displayComponents/loading/loading';
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

  const from = location.state?.from?.pathname || routes.MAIN.PATH;

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
    <div className="full-heigh default-background d-flex align-items-center">
      <div className="overlay" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card text-center">
              <div className="card-body">
                <Loading isLoading={isLoading} />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

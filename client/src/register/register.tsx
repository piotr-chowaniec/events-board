import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import FaIcon from '../displayComponents/faIcon/faIcon';
import FullPageCard from '../displayComponents/fullPageCard/fullPageCard';
import { useAppDispatch } from '../store/hooks';
import { setUserData } from '../store/user/userSlice';
import { useFetchProfileData } from '../shared/api/hooks';
import routes from '../routes';

import RegisterForm from './registerForm';
import { useRegister } from './api/hooks';
import { RegisterFormValues } from './types';

const newAccount = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { call: registerUser, isLoading: isRegisterLoading } = useRegister();
  const { call: fetchProfileData, isLoading: isFetchProfileLoading } =
    useFetchProfileData();

  const submitRegisterForm = useCallback(
    async (values: RegisterFormValues) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...user } = values;

      await registerUser(user);
      const userData = await fetchProfileData({});
      dispatch(setUserData(userData));
      navigate(routes.PROFILE.PATH);
    },
    [registerUser, fetchProfileData, dispatch, navigate],
  );

  const isLoading = isRegisterLoading || isFetchProfileLoading;

  return (
    <FullPageCard isLoading={isLoading}>
      <FaIcon icon="user" size={100} />
      <h2 className="card-title my-3">Register</h2>
      <div className="text-start">
        <Formik
          initialValues={newAccount}
          validationSchema={userSchemas.registerUserFormSchema}
          component={RegisterForm}
          onSubmit={submitRegisterForm}
        />
      </div>
    </FullPageCard>
  );
};

export default Register;

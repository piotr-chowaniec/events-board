import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import FaIcon from '../displayComponents/faIcon/faIcon.component';

import RegisterForm from './registerForm.component';
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
  // const dispatch = useDispatch();
  const { call: registerUser, isLoading: isRegistering } = useRegister();
  // const { call: fetchProfileData, isLoading: isFetchingProfile } =
  //   useFetchProfileData();

  const submitRegisterForm = useCallback(
    async (values: RegisterFormValues) => {
      await registerUser(values);
      // const userData = await fetchProfileData();
      // dispatch(setUserData(userData));
      // history.push(routes.APPLICATION.PATH);
    },
    [registerUser],
  );

  // const isLoading = isRegistering || isFetchingProfile;

  return (
    <div className="full-heigh default-background d-flex align-items-center">
      <div className="overlay" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card text-center">
              <div className="card-body">
                {/* <Loading isLoading={isLoading} /> */}
                <FaIcon icon="user" size={100} />
                <h2 className="card-title my-3">Register</h2>
                <Formik
                  initialValues={newAccount}
                  validationSchema={userSchemas.registerUserSchema}
                  component={RegisterForm}
                  onSubmit={submitRegisterForm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

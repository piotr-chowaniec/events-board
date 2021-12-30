import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import FaIcon from '../displayComponents/faIcon/faIcon.component';
import { useLogin } from '../shared/api/hooks';
import routes from '../routes';

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
  const navigate = useNavigate();
  const { call: registerUser, isLoading: isRegistering } = useRegister();
  const { call: loginUser, isLoading: isLogging } = useLogin();

  const submitRegisterForm = useCallback(
    async (values: RegisterFormValues) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...user } = values;

      await registerUser(user);
      await loginUser(user);
      navigate(routes.MAIN.PATH);
    },
    [registerUser, loginUser, navigate],
  );

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
                  validationSchema={userSchemas.registerUserFormSchema}
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

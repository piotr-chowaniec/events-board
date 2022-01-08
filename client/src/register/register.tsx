import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import FaIcon from '../displayComponents/faIcon/faIcon';
import Loading from '../displayComponents/loading/loading';
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
  const navigate = useNavigate();
  const { call: registerUser, isLoading } = useRegister();

  const submitRegisterForm = useCallback(
    async (values: RegisterFormValues) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...user } = values;

      await registerUser(user);
      navigate(routes.PROFILE.PATH);
    },
    [registerUser, navigate],
  );

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
                <h2 className="card-title my-3">Register</h2>
                <div className="text-start">
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
    </div>
  );
};

export default Register;
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import { useAppSelector } from '../store/hooks';
import { userDataSelector } from '../store/user/selectors';
import { useUpdatePassword } from '../shared/api/hooks';
import routes from '../routes';
import Loading from '../displayComponents/loading/loading';

import PasswordChangeForm from './passwordChangeForm';
import { PasswordChangeFormValues } from './types';

const initialPassword = {
  password: '',
  confirmPassword: '',
};

const PasswordChange = (): JSX.Element => {
  const navigate = useNavigate();

  const { call: updatePassword, isLoading } = useUpdatePassword();
  const { id: userId, firstName, lastName } = useAppSelector(userDataSelector);

  const onPasswordUpdate = useCallback(
    async (newPassword: PasswordChangeFormValues) => {
      await updatePassword({ ...newPassword, userId });
      navigate(routes.PROFILE.PATH);
    },
    [updatePassword, navigate, userId],
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
                <h2 className="card-title my-3">{`${firstName} ${lastName}`}</h2>
                <p>
                  <code className="text-muted">Change your password</code>
                </p>
                <div className="text-start">
                  <Formik
                    initialValues={initialPassword}
                    validationSchema={userSchemas.updatePasswordSchema}
                    component={PasswordChangeForm}
                    onSubmit={onPasswordUpdate}
                    enableReinitialize
                  />
                  <Link
                    to={routes.PROFILE.PATH}
                    className="btn d-grid btn-outline-danger my-3"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;

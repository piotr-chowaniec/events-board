import React, { useCallback, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import { resetToken } from '../services/fetchService/tokenUtils';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { userDataSelector } from '../store/user/selectors';
import { setUserData, initialState } from '../store/user/userSlice';
import {
  useFetchProfileData,
  useUpdateUser,
  useDeleteUser,
} from '../shared/api/hooks';
import useModal from '../shared/hooks/useModal.hook';
import routes from '../routes';
import Loading from '../displayComponents/loading/loading';

import ProfileForm from './profileForm';
import { ProfileFormValues } from './types';

const ModalBody = (
  <>
    <h5>Dear User. Be careful.</h5>
    <p>
      Are you sure you want to remove your profile? Profile removal can&apos;t
      be undone.
    </p>
  </>
);

const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();

  const { call: fetchProfileData, isLoading: isFetchProfileLoading } =
    useFetchProfileData();
  const { call: updateUser, isLoading: isUpdateProfileLoading } =
    useUpdateUser();
  const { call: deleteUser, isLoading: isDeleteProfileLoading } =
    useDeleteUser();

  const {
    id: userId,
    email,
    firstName,
    lastName,
  } = useAppSelector(userDataSelector);
  const user = { email, firstName, lastName };

  const fetchUserData = useCallback(async () => {
    const userData = await fetchProfileData({});
    dispatch(setUserData(userData));
  }, [dispatch, fetchProfileData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const onProfileUpdate = useCallback(
    async (values: ProfileFormValues) => {
      await updateUser({ ...values, userId });
      await fetchUserData();
    },
    [updateUser, fetchUserData, userId],
  );

  const onProfileRemove = useCallback(async () => {
    await deleteUser({ userId });
    dispatch(setUserData(initialState));
    resetToken();
    navigate(routes.MAIN.PATH);
  }, [deleteUser, dispatch, navigate, userId]);

  const isLoading = isFetchProfileLoading || isUpdateProfileLoading;
  const loadingMessage = useMemo(() => {
    if (isFetchProfileLoading) {
      return 'Loading User data...';
    }
    if (isUpdateProfileLoading) {
      return 'Updating User data...';
    }
    if (isDeleteProfileLoading) {
      return 'Deleting User data...';
    }
  }, [isFetchProfileLoading, isUpdateProfileLoading, isDeleteProfileLoading]);

  return (
    <div className="full-heigh default-background d-flex align-items-center">
      <div className="overlay" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card text-center">
              <div className="card-body">
                <Loading
                  isLoading={isLoading}
                  loadingMessage={loadingMessage}
                />
                <h2 className="card-title my-3">{`${firstName} ${lastName}`}</h2>
                <p>
                  <code className="text-muted">Change your profile data</code>
                </p>
                <div className="text-start">
                  <Formik
                    initialValues={user.email ? user : initialState}
                    validationSchema={userSchemas.updateProfileSchema}
                    component={ProfileForm}
                    onSubmit={onProfileUpdate}
                    enableReinitialize
                  />
                  <Link
                    to={routes.PASSWORD.PATH}
                    className="btn d-grid btn-outline-warning my-3"
                  >
                    Change Password
                  </Link>
                  <div className="d-grid">
                    <Button
                      variant="outline-danger"
                      onClick={showModal}
                      disabled={isLoading}
                    >
                      Remove Your Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Remove Profile"
        body={ModalBody}
        confirmButtonDescription="Remove Profile permanently"
        onConfirm={onProfileRemove}
      />
    </div>
  );
};

export default Profile;

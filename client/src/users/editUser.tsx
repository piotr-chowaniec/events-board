import React, { useState, useCallback } from 'react';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import UserImage from '../displayComponents/imageComponent/userImage';
import { initialState } from '../store/user/userSlice';

import EditUserForm from './editUserForm';
import { UserType } from './types';

type EditUserType = {
  modalData: UserType;
  handleSubmit: () => void | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formRef: any;
};

const EditUser = ({
  modalData: user,
  handleSubmit,
  formRef,
}: EditUserType): JSX.Element => {
  const [imagePreview, setImagePreview] = useState();

  const renderEditUserForm = useCallback(
    (formikProps) => (
      <EditUserForm {...formikProps} setImagePreview={setImagePreview} />
    ),
    [setImagePreview],
  );

  return (
    <div className="text-center" data-testid="edit-user-form">
      <UserImage image={imagePreview || user?.image} />
      <div className="text-start">
        <Formik
          innerRef={formRef}
          initialValues={user?.email ? user : initialState.user}
          validationSchema={userSchemas.updateUserSchema}
          component={renderEditUserForm}
          onSubmit={handleSubmit}
          enableReinitialize
        />
      </div>
    </div>
  );
};

export default EditUser;

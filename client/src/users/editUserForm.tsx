import React from 'react';
import { Form, Field, FormikProps } from 'formik';

import Input from '../displayComponents/forms/inputFormik';
import Select from '../displayComponents/forms/selectFormik';
import DropzoneFormik from '../displayComponents/forms/dropzoneFormik';
import { userRolesOptions } from '../shared/constants';

import { UserEditFormValues } from './types';

type ProfileEditProps = {
  setImagePreview: (previewImage: string) => void;
} & FormikProps<UserEditFormValues>;

const EditUserForm = ({ setImagePreview }: ProfileEditProps) => (
  <Form>
    <Field
      label="First Name"
      name="firstName"
      placeholder="First Name"
      component={Input}
    />
    <Field
      label="Last Name"
      name="lastName"
      placeholder="Last Name"
      component={Input}
    />
    <Field label="Email" name="email" placeholder="Email" component={Input} />
    <Field
      label="Role"
      name="role"
      component={Select}
      options={userRolesOptions}
    />
    <Field
      label="User image"
      name="file"
      component={DropzoneFormik}
      setImagePreview={setImagePreview}
    />
  </Form>
);

export default EditUserForm;

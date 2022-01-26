import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';
import DropzoneFormik from '../displayComponents/forms/dropzoneFormik';

import { ProfileFormValues } from './types';

type ProfileEditProps = {
  setImagePreview: (previewImage: string) => void;
} & FormikProps<ProfileFormValues>;

const ProfileForm = ({ dirty, setImagePreview }: ProfileEditProps) => (
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
      label="User image"
      name="file"
      component={DropzoneFormik}
      setImagePreview={setImagePreview}
    />
    <div className="d-grid">
      <Button type="submit" variant="outline-success" disabled={!dirty}>
        Save Changes
      </Button>
    </div>
  </Form>
);

export default ProfileForm;

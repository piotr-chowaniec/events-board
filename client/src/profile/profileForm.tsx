import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';

import { ProfileFormValues } from './types';

const ProfileForm = ({ dirty }: FormikProps<ProfileFormValues>) => (
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
    <div className="d-grid">
      <Button type="submit" variant="outline-success" disabled={!dirty}>
        Submit
      </Button>
    </div>
  </Form>
);

export default ProfileForm;

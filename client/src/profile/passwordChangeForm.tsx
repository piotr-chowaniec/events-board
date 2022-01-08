import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';

import { PasswordChangeFormValues } from './types';

const PasswordChangeForm = ({
  dirty,
}: FormikProps<PasswordChangeFormValues>) => (
  <Form>
    <Field label="Password" name="password" type="password" component={Input} />
    <Field
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      component={Input}
    />
    <div className="d-grid">
      <Button type="submit" variant="outline-success" disabled={!dirty}>
        Change Password
      </Button>
    </div>
  </Form>
);

export default PasswordChangeForm;

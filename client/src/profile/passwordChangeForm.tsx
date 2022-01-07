import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import InputGroup from '../displayComponents/forms/inputGroupFormik';

import { PasswordChangeFormValues } from './types';

const PasswordChangeForm = ({
  dirty,
}: FormikProps<PasswordChangeFormValues>) => (
  <Form>
    <Field
      name="password"
      type="password"
      placeholder="Password"
      icon={{ icon: 'lock' }}
      component={InputGroup}
    />
    <Field
      name="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      icon={{ icon: 'lock' }}
      component={InputGroup}
    />
    <div className="d-grid">
      <Button type="submit" variant="outline-success" disabled={!dirty}>
        Change Password
      </Button>
    </div>
  </Form>
);

export default PasswordChangeForm;

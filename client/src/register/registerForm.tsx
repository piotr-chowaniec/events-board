import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';

import { RegisterFormValues } from './types';

const RegisterForm = ({ dirty }: FormikProps<RegisterFormValues>) => (
  <Form>
    <Field label="First Name" name="firstName" component={Input} />
    <Field label="Last Name" name="lastName" component={Input} />
    <Field label="Email" name="email" component={Input} />
    <Field label="Password" name="password" type="password" component={Input} />
    <Field
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      component={Input}
    />
    <div className="d-grid">
      <Button type="submit" variant="outline-success" disabled={!dirty}>
        Register!
      </Button>
    </div>
  </Form>
);

export default RegisterForm;

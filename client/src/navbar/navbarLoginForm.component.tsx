import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';

import { LoginFormValues } from './types';

const NavbarLoginForm = ({ dirty }: FormikProps<LoginFormValues>) => (
  <Form>
    <Field
      label="Email"
      name="email"
      type="email"
      placeholder="Email"
      component={Input}
    />
    <Field
      label="Password"
      name="password"
      type="password"
      placeholder="Password"
      component={Input}
    />
    <div className="d-grid">
      <Button type="submit" variant="primary" disabled={!dirty}>
        Login
      </Button>
    </div>
  </Form>
);

export default NavbarLoginForm;

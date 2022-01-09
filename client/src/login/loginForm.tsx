import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';
import { LoginFormValues } from '../shared/types';

const LoginForm = ({ dirty }: FormikProps<LoginFormValues>) => (
  <Form>
    <Field label="Email" name="email" type="email" component={Input} />
    <Field label="Password" name="password" type="password" component={Input} />
    <div className="d-grid">
      <Button type="submit" variant="primary" disabled={!dirty}>
        Login
      </Button>
    </div>
  </Form>
);

export default LoginForm;

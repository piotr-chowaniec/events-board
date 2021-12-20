import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { Button } from 'react-bootstrap';

import InputGroup from '../displayComponents/forms/inputGroupFormik';

import { RegisterFormValues } from './types';

const RegisterForm = ({ dirty }: FormikProps<RegisterFormValues>) => (
  <Form>
    <Field
      name="firstName"
      placeholder="First Name"
      icon={{ icon: 'user' }}
      component={InputGroup}
    />
    <Field
      name="lastName"
      placeholder="Last Name"
      icon={{ icon: 'user' }}
      component={InputGroup}
    />
    <Field
      name="email"
      placeholder="Email"
      icon={{ icon: 'envelope' }}
      component={InputGroup}
    />
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
        Register!
      </Button>
    </div>
  </Form>
);

export default RegisterForm;

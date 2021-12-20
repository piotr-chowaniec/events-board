import React from 'react';
import { FieldProps } from 'formik';
import { Form } from 'react-bootstrap';

type InputParamsType = {
  label?: string;
  type?: string;
  placeholder?: string;
} & FieldProps;

const InputFormik = ({
  field,
  label,
  form,
  type = 'text',
  placeholder,
}: InputParamsType): JSX.Element => {
  const { touched, errors } = form;

  const isValid = Boolean(touched[field.name] && !errors[field.name]);
  const isInvalid = Boolean(touched[field.name] && errors[field.name]);

  return (
    <Form.Group className="pb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...field}
        id={field.name}
        type={type}
        placeholder={placeholder}
        isValid={isValid}
        isInvalid={isInvalid}
      />
      {isInvalid && (
        <div className="invalid-feedback">{errors[field.name]}</div>
      )}
    </Form.Group>
  );
};

export default InputFormik;

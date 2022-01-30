import React from 'react';
import { FieldProps } from 'formik';
import { Form } from 'react-bootstrap';

import './styles.scss';

type SelectOptionType = { value: string; label: string };

type SelectParamsType = {
  label?: string;
  options: SelectOptionType[];
} & FieldProps;

const SelectFormik = ({
  field,
  label,
  form,
  options,
}: SelectParamsType): JSX.Element => {
  const { touched, errors } = form;

  const isValid = Boolean(touched[field.name] && !errors[field.name]);
  const isInvalid = Boolean(touched[field.name] && errors[field.name]);

  return (
    <Form.Group className="mb-3">
      <Form.Label className="bg-white small text-muted ms-2 px-2">
        {label}
      </Form.Label>
      <Form.Select
        {...field}
        className="input-border-overlay input-select"
        size="sm"
        id={field.name}
        isValid={isValid}
        isInvalid={isInvalid}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Form.Select>
      {isInvalid && (
        <div className="invalid-feedback">{errors[field.name]}</div>
      )}
    </Form.Group>
  );
};

export default SelectFormik;

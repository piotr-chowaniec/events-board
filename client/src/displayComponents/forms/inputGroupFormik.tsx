import React from 'react';
import { FieldProps } from 'formik';
import { InputGroup, FormControl } from 'react-bootstrap';

import FaIcon, { FaIconPropsType } from '../faIcon/faIcon.component';

type InputParamsType = {
  label?: string;
  type?: string;
  placeholder?: string;
  icon: FaIconPropsType;
} & FieldProps;

const InputGroupFormik = ({
  field,
  form,
  type = 'text',
  placeholder,
  icon,
}: InputParamsType): JSX.Element => {
  const { touched, errors } = form;

  const isValid = Boolean(touched[field.name] && !errors[field.name]);
  const isInvalid = Boolean(touched[field.name] && errors[field.name]);

  return (
    <InputGroup className="mb-3">
      {icon && (
        <InputGroup.Text>
          <FaIcon {...icon} />
        </InputGroup.Text>
      )}
      <FormControl
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
    </InputGroup>
  );
};

export default InputGroupFormik;

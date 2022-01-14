import React from 'react';
import { FieldProps } from 'formik';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const TextareaQuillFormik = ({ field }: FieldProps): JSX.Element => (
  <ReactQuill value={field.value} onChange={field.onChange(field.name)} />
);

export default TextareaQuillFormik;

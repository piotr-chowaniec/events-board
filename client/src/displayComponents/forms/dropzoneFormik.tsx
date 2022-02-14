import React, { useState, useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldProps } from 'formik';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './styles.module.scss';

type DropzoneParamsType = {
  label?: string;
  setImagePreview?: (previewImage: string | null) => void;
} & FieldProps;

const DropzoneFormik = ({
  label,
  form,
  field,
  setImagePreview = () => null,
}: DropzoneParamsType): JSX.Element => {
  const { setFieldValue } = form;
  const [dragHover, setDragHover] = useState(false);

  const onDropAccepted = useCallback(
    (files) => {
      const [file] = files;

      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFieldValue(field.name, file);
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsText(file);
    },
    [setFieldValue, setImagePreview, field],
  );
  const onDropRejected = useCallback(() => {
    setFieldValue('file', null);
    setImagePreview(null);
  }, [setFieldValue, setImagePreview]);
  const onDragEnter = () => setDragHover(true);
  const onDragLeave = () => setDragHover(false);

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      onDragEnter,
      onDragLeave,
      accept: 'image/*',
      maxSize: 10485760, // 10MB in bytes
      multiple: false,
    });

  const className: string = useMemo(
    () =>
      classnames(`${styles.dropzone} ${styles.dropzoneBorderOverlay}`, {
        [styles.dropzoneHover]: dragHover,
        [styles.dropzoneValid]: acceptedFiles.length,
        [styles.dropzoneInvalid]: fileRejections.length,
      }),
    [dragHover, acceptedFiles, fileRejections],
  );

  const fileName = acceptedFiles.length && acceptedFiles[0].name;
  const defaultMessage = `Drag 'n' drop some image here, or click to select`;
  const invalidMessage =
    fileRejections.length &&
    !acceptedFiles.length &&
    'Only one image file max size 10MB is accepted';

  const message = fileName || invalidMessage || defaultMessage;

  return (
    <Form.Group className="mb-3">
      <Form.Label className="bg-white small text-muted ms-2 px-2">
        {label}
      </Form.Label>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        <span>{message}</span>
      </div>
    </Form.Group>
  );
};

export default DropzoneFormik;

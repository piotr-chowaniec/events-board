import React, { useCallback, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ModalDataType } from '../../shared/types';

const noop = () => null;

export type FormModalParams = {
  show?: boolean;
  modalData?: ModalDataType;
  onHide?: () => void | Promise<void> | null;
  onCancel?: () => void | Promise<void> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm?: (modalData: any) => void | Promise<void> | null;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderBody?: (modalData: any) => JSX.Element;
  cancelButtonDescription?: string;
  confirmButtonDescription?: string;
};

const FormModal = ({
  show = false,
  modalData,
  onHide = noop,
  onCancel = noop,
  onConfirm = noop,
  title,
  renderBody,
  cancelButtonDescription = 'Cancel',
  confirmButtonDescription = 'Confirm',
  ...props
}: FormModalParams): JSX.Element => {
  const formRef = useRef<HTMLFormElement>();

  const onSubmit = useCallback(() => {
    if (formRef?.current) {
      formRef.current?.handleSubmit();
    }
  }, [formRef]);

  const handleCancel = useCallback(() => {
    onCancel();
    onHide();
  }, [onCancel, onHide]);

  const handleSubmit = useCallback(
    (newValues) => {
      onConfirm({ ...modalData, ...newValues });
      onHide();
    },
    [onConfirm, onHide, modalData],
  );

  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      centered
      aria-labelledby="formModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="formModal">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderBody &&
          renderBody({
            modalData,
            handleSubmit,
            formRef,
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} variant="danger">
          {cancelButtonDescription}
        </Button>
        <Button onClick={onSubmit} variant="success">
          {confirmButtonDescription}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;

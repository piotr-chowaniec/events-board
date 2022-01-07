import React, { useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';

const noop = () => null;

export type ConfirmModalParams = {
  show?: boolean;
  onHide?: () => void | Promise<void> | null;
  onCancel?: () => void | Promise<void> | null;
  onConfirm?: () => void | Promise<void> | null;
  title: string;
  body: JSX.Element;
  cancelButtonDescription?: string;
  confirmButtonDescription?: string;
};

const ConfirmModal = ({
  show = false,
  onHide = noop,
  onCancel = noop,
  onConfirm = noop,
  title,
  body,
  cancelButtonDescription = 'Cancel',
  confirmButtonDescription = 'Confirm',
  ...props
}: ConfirmModalParams): JSX.Element => {
  const handleCancel = useCallback(() => {
    onCancel();
    onHide();
  }, [onCancel, onHide]);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onHide();
  }, [onConfirm, onHide]);

  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      centered
      aria-labelledby="confirmModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirmModal">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} variant="secondary">
          {cancelButtonDescription}
        </Button>
        <Button onClick={handleConfirm} variant="success">
          {confirmButtonDescription}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

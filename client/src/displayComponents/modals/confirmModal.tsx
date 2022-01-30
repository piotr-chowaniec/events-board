import React, { useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ModalDataType } from '../../shared/types';

const noop = () => null;

export type ConfirmModalParams = {
  show?: boolean;
  modalData?: ModalDataType;
  onHide?: () => void | Promise<void> | null;
  onCancel?: () => void | Promise<void> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm?: (modalData: any) => void | Promise<void> | null;
  title: string;
  body?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderBody?: (modalData: any) => JSX.Element;
  cancelButtonDescription?: string;
  confirmButtonDescription?: string;
};

const ConfirmModal = ({
  show = false,
  modalData,
  onHide = noop,
  onCancel = noop,
  onConfirm = noop,
  title,
  body,
  renderBody,
  cancelButtonDescription = 'Cancel',
  confirmButtonDescription = 'Confirm',
  ...props
}: ConfirmModalParams): JSX.Element => {
  const handleCancel = useCallback(() => {
    onCancel();
    onHide();
  }, [onCancel, onHide]);

  const handleConfirm = useCallback(() => {
    onConfirm(modalData);
    onHide();
  }, [onConfirm, onHide, modalData]);

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
      <Modal.Body>{renderBody ? renderBody(modalData) : body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} variant="danger">
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

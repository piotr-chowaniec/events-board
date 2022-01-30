import React, { useState, useCallback, useMemo } from 'react';

import ConfirmModal, {
  ConfirmModalParams,
} from '../../displayComponents/modals/confirmModal';
import { FormModalParams } from '../../displayComponents/modals/formModal';
import { ModalDataType } from '../types';

interface ModalComponentInterface {
  (props: ConfirmModalParams | FormModalParams): JSX.Element;
}
interface UseModalInterface {
  (props?: { ModalComponent?: ModalComponentInterface }): {
    Modal: ModalComponentInterface;
    showModal: (newState?: ModalDataType) => void;
  };
}

const useModal: UseModalInterface = ({
  ModalComponent = ConfirmModal,
} = {}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType>();

  const hideModal = useCallback(() => {
    setModalData(null);
    setModalVisible(false);
  }, []);
  const showModal = useCallback((modalData?: ModalDataType) => {
    setModalData(modalData);
    setModalVisible(true);
  }, []);

  const Modal = useMemo(() => {
    const Modal = (props: ConfirmModalParams | FormModalParams) => (
      <ModalComponent
        show={isModalVisible}
        modalData={modalData}
        onHide={hideModal}
        {...props}
      />
    );
    return Modal;
  }, [ModalComponent, hideModal, isModalVisible, modalData]);

  return {
    Modal,
    showModal,
  };
};

export default useModal;

import React, { useState, useCallback, useMemo } from 'react';

import ConfirmModal, {
  ConfirmModalParams,
} from '../../displayComponents/confirmModal';

const useModal = ({ ModalComponent = ConfirmModal } = {}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const hideModal = useCallback(() => setModalVisible(false), []);
  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const Modal = useMemo(() => {
    const Modal = (props: ConfirmModalParams) => (
      <ModalComponent show={isModalVisible} onHide={hideModal} {...props} />
    );
    return Modal;
  }, [ModalComponent, hideModal, isModalVisible]);

  return {
    Modal,
    showModal,
  };
};

export default useModal;

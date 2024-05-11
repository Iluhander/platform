import { useContext } from 'react';

import { ModalContext, EModalVariant, EModalStatus, IModalData, EShowModalType } from './index';

function getModal(
  type: EShowModalType,
  setShowModal: (type: EShowModalType, data?: IModalData) => void,
  removeModal: () => void,
  data?: IModalData
): IModalData | undefined {
  switch (type) {
    case EShowModalType.NOT_AUTHENTICATED:
      return {
        variant: EModalVariant.AUTH_GLOBAL,
        status: EModalStatus.VISIBLE,
        propsData: {
          removeWarning: () => {
            setShowModal(EShowModalType.NOTHING);
            removeModal();
          }
        },
        ...(data || {})
      };
    case EShowModalType.NOT_ACTIVATED:
      return {
        variant: EModalVariant.ACTIVATE_GLOBAL,
        status: EModalStatus.VISIBLE,
        propsData: {
          action: () => {
            setShowModal(EShowModalType.NOTHING);
            removeModal();
          }
        },
        ...(data || {})
      };
    default:
      return data;
  }
}

/**
 * Hook for easily showing modal. Provides default variants
 * for Not_Activated and Not_Authenticated modals.
 * @param {Object} goalModalData - custom modal data to show.
 * @returns array [showModalData, setShowModalData].
 */
export default function useShowModal() {
  const { setModalData, removeModal } = useContext(ModalContext);
  const setShowModal = (type: EShowModalType, data?: IModalData) => {
    const newModalData = getModal(type, setShowModal, removeModal, data);

    if (newModalData) {
      setModalData(newModalData);
    }
  };

  return setShowModal;
}

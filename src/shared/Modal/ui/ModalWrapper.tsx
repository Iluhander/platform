// External.
import { useContext } from 'react';
import { createPortal } from 'react-dom';

// Components.
import GlobalModal from './GlobalModal/GlobalModal';
import NonBlockingModal from './NonBlockingModal/NonBlockingModal';
import ErrModal from './NonBlockingModal/ErrModal';
import AuthGlobalModal from './GlobalModal/AuthGlobalModal';
import ActivateGlobalModal from './GlobalModal/ActivateGlobalModal';

// Utilities.
import { EModalStatus, EModalVariant, ModalContext } from '../lib';

export default function ModalWrapper() {
  const { modalData } = useContext(ModalContext);
  const { variant, status, propsData } = modalData;

  if (status === EModalStatus.NO_MODAL) {
    return <div />;
  }

  let modal = <div></div>;

  propsData.status = status;

  switch (variant) {
    case EModalVariant.ERR_MODAL:
      modal = <ErrModal {...propsData} />;
      break;
    case EModalVariant.AUTH_GLOBAL:
      modal = <AuthGlobalModal {...propsData} />;
      break;
    case EModalVariant.NON_BLOCKING:
      modal = <NonBlockingModal {...propsData} />;
      break;
    case EModalVariant.ACTIVATE_GLOBAL:
      modal = <ActivateGlobalModal {...propsData} />;
      break;
    case EModalVariant.GLOBAL:
      modal = <GlobalModal {...propsData} />;
      break;
    default:
      return <div />;
  }

  // @ts-ignore
  return createPortal(modal, document.getElementById('root'));
}

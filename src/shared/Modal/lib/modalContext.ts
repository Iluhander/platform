import { Dispatch, SetStateAction, createContext } from 'react';
import { EModalStatus, EModalVariant, IModalData } from './types';

export const DefaultModalData: IModalData = {
  variant: EModalVariant.NON_BLOCKING,
  status: EModalStatus.NO_MODAL,
  propsData: {}
};

export interface IModalDataHost {
  modalData: IModalData;
  setModalData: Dispatch<SetStateAction<IModalData>>;
  removeModal: () => void;
}

export const ModalContext = createContext<IModalDataHost>({
  modalData: DefaultModalData,
  setModalData: () => {},
  removeModal: () => {}
});

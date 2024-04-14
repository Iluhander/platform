'use client'

import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { ReqStatus } from '@iluhander/uwu-react';

// Utilities.
import { UserDataContext, NotAuthenticatedUserData } from './shared/common/lib/user/userData';
import useGetAuthData from './shared/common/api/user/useGetAuthData';
import { DefaultModalData, EModalStatus, IModalData, ModalContext } from './shared/Modal/lib';
import userSession from './shared/common/lib/user/userSession';

// Components.
import AuxiliaryProvider from './shared/common/lib/auxiliary/AuxiliaryProvider';
import { Navbar } from './widgets/Navbar';
import Footer from './widgets/Footer/ui/Footer';
import ModalWrapper from './shared/Modal/ui/ModalWrapper';

interface IAppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper:FC<IAppWrapperProps> = ({ children }) => {
  const [modalData, setModalData] = useState(DefaultModalData);
  const { data: userData, status, setData: setUserData, exec } = useGetAuthData();
  const modalRemoveTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    switch (status) {
      case ReqStatus.LOADED:
      case ReqStatus.LOADING:
        return;
      case ReqStatus.ERROR:
        setUserData(NotAuthenticatedUserData);
        userSession.removeToken();
        return;
      default:
        if (userSession.getToken()) {
          exec();
          return;
        }

        setUserData(NotAuthenticatedUserData);
        userSession.removeToken();
    }
  }, [status]);

  const handleSetModalData = (newData: SetStateAction<IModalData>) => {
    clearTimeout(modalRemoveTimeout.current);

    setModalData(newData);
  };

  const removeModal = () => {
    modalRemoveTimeout.current = setTimeout(() => {
      setModalData((prev) => ({
        ...prev,
        status: EModalStatus.NO_MODAL
      }));
    }, 400);

    setModalData((prev) => ({
      ...prev,
      status: EModalStatus.HIDING
    }));
  };

  return (
    <>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <AuxiliaryProvider>
          <ModalContext.Provider
            value={{ modalData, setModalData: handleSetModalData, removeModal }}
          >
            <Navbar />
            {children}
            <Footer />
            <ModalWrapper />
          </ModalContext.Provider>
        </AuxiliaryProvider>
      </UserDataContext.Provider>
      <div id="root" />
    </>
  );
};

export default AppWrapper;

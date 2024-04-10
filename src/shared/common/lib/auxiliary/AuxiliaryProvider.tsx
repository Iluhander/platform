import React, { FC, useContext, useEffect } from 'react';
import { useReq } from '@iluhander/uwu-react';
import { AuxiliaryDataContext, IAuxiliaryData } from './auxiliaryData';
import { $api } from '../../api/http';
import { EUserDataStatus, UserDataContext } from '../user/userData';

interface IAuxiliaryProviderProps {
  children: React.ReactNode;
}

const AuxiliaryProvider: FC<IAuxiliaryProviderProps> = ({ children }) => {
  const { userData } = useContext(UserDataContext);
  const { data, exec, status } = useReq<never, IAuxiliaryData>(() => $api.get('/user/aux'), {
    notInstantReq: true,
    initialData: {
      novels: [],
      features: []
    }
  });

  useEffect(() => {
    if (userData.status === EUserDataStatus.AUTHENTICATED) {
      exec();
    }
  }, [userData?.status]);

  return (
    <AuxiliaryDataContext.Provider value={{ auxData: { data: data as IAuxiliaryData, status } }}>
      {children}
    </AuxiliaryDataContext.Provider>
  );
}

export default AuxiliaryProvider

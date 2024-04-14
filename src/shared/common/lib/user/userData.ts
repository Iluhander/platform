import { createContext } from 'react';

export const DefaultUserName = '?';

export enum EUserDataStatus {
  NOT_AUTHENTICATED,
  LOADING,
  AUTHENTICATED
};

export interface IUserData {
  id: string;
  email: string;
  isActivated: boolean;
  status: EUserDataStatus;
  role: string;
  username: string;
  avatarVersion: number;
}

export const LoadingUserData: IUserData = {
  id: '',
  email: '',
  isActivated: false,
  status: EUserDataStatus.LOADING,
  role: '',
  username: '',
  avatarVersion: -1
};

export const NotAuthenticatedUserData: IUserData = {
  id: '',
  email: '',
  isActivated: false,
  status: EUserDataStatus.NOT_AUTHENTICATED,
  role: '',
  username: '',
  avatarVersion: -1
};

interface IUserDataHost {
  userData: IUserData;
  setUserData: (newData: IUserData) => void; 
}

export const UserDataContext = createContext<IUserDataHost>({
  userData: LoadingUserData,
  setUserData: () => {}
});

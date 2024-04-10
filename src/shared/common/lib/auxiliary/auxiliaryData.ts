import { ReqStatus } from '@iluhander/uwu-react';
import { createContext } from 'react';

export interface IAuxiliaryData {
  features: number[];
  novels: any[];
}

const DefaultAuxiliaryData: IAuxiliaryData = {
  features: [],
  novels: []
}

interface IAuxiliaryDataHost {
  auxData: {
    data: IAuxiliaryData;
    status: number;
  }
}

export const AuxiliaryDataContext = createContext<IAuxiliaryDataHost>({
  auxData: {
    data: DefaultAuxiliaryData,
    status: ReqStatus.LOADING 
  }
});

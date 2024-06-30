'use client'

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef
} from "react"
import { INovel } from "../../model";
import EngineAPI from "./api";
import { UserDataContext } from "../user/userData";
import { ReqStatus, useReq } from "@iluhander/uwu-react";

export const EngineStatus = {
  ...ReqStatus,
  STARTED: 1000
}

class EngineData {
  constructor(
    public playMode = false,
    public add = (data: Record<string, any>) => {},
    public loadingProgression = 0,
    public setLoadingProgression = (x: number) => {},
    public engineStatus = ReqStatus.LOADING,
    public setEngineStatus: Dispatch<SetStateAction<number>> = () => {}
  ) {}
}

export const EngineContext = createContext(new EngineData());

export const EngineAPIProvider: FC<{
  children: ReactNode,
  playMode: boolean,
  novelData: INovel
}> = ({ children, playMode, novelData }) => {
  const instance = useRef<EngineAPI>();
  const { userData } = useContext(UserDataContext);

  // Pinging the engine.
  // const { exec: ping, status: pingStatus } = useReq(async () => {
  //   await instance.current?.ping();
  //   return { data: {} };
  // }, {
  //   notInstantReq: true,
  //   timeout: 2500,
  //   attempts: 3
  // });

  // Engine loading status manager.
  const {
    data: loadingProgression,
    exec: load,
    status,
    setStatus: setEngineStatus,
    setData: setLoadingProgression
  } = useReq(() => Promise.resolve({ data: 0 }), {
    notInstantReq: true,
    StatusObj: EngineStatus
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Starting the engine (for the first time).)
      load();

      instance.current = EngineAPI.instantiate();
      EngineAPI.add({
        userId: userData.id,
        novelId: novelData.id,
        ownerId: novelData.author?.id
      });
      
      // Pinging the engine.
      //ping();
    }
  }, [typeof window]);

  // useEffect(() => {
  //   if (pingStatus === ReqStatus.ERROR) {
  //     // Reloading the engine.
  //     load();
  //     ping();
  //   }
  // }, [pingStatus]);

  return (
    <EngineContext.Provider
      value={new EngineData(
        playMode,
        EngineAPI.add.bind(EngineAPI),
        loadingProgression || 0,
        setLoadingProgression,
        status,
        setEngineStatus
      )}
    >
      {children}
    </EngineContext.Provider>
  );
};

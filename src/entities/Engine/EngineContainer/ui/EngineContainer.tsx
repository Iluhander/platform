'use client'

import { ReqStatus } from "@iluhander/uwu-react";
import { FC, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { StrictClient } from "@/shared/common/ui";

interface IEngineContainerProps {
  Engine: FC<any>;
  playMode: boolean;
  fullScreenElems: string[];
}
import { LoadingDots, ProgressionLoader } from "@/shared/Animated";

import s from './EngineContainer.module.scss';

const EngineContainer: FC<IEngineContainerProps> = ({ Engine, playMode, fullScreenElems }) => {
  const [engineStatus, setEngineStatus] = useState(ReqStatus.LOADING);
  const [loadingProgression, setLoadingProgression] = useState(0);

  const screenHandle = useFullScreenHandle();
  
  const engineBlock = useRef<HTMLDivElement>(null);
  async function zoomIn() {
    window.scroll(0, 0);

    await screenHandle.enter();
  }

  async function zoomOut() {
    window.scroll(0, 0);

    await screenHandle.exit();
  }

  let containerClass = s.engineContainer__default;
  if (screenHandle.active) {
    containerClass  = s.engineContainer__fullscreen;
  } else if (isMobile) {
    containerClass = s.engineContainer__mobile;
  }

  let unityClass = s.engineContainer__unity;
  if (screenHandle.active) {
    unityClass = s.engineContainer__fullscreenUnity;
  }

  return (
    <div>
      <FullScreen handle={screenHandle}>
        <div ref={engineBlock} className={`${containerClass} engineBlock`}>
          <StrictClient
            FC={Engine}
            playMode={playMode}
            setEngineStatus={setEngineStatus}
            setLoadingProgression={setLoadingProgression}
            className={unityClass}
          />
          {engineStatus === ReqStatus.LOADING && (
            <div className={s.engineContainer__loader}>
              <p> Загружаем движок </p>
              <ProgressionLoader max={10} cur={loadingProgression * 10} />
            </div>
          )}
          {screenHandle.active ? (
            <div className="engineResize engineZoomOut" onClick={zoomOut} title="Уменьшить окно" />
          ) : (
            <div className="engineResize engineZoomIn" onClick={zoomIn} title="Полный экран" />
          )}
        </div>
      </FullScreen>
    </div>
  );
}

export default EngineContainer;

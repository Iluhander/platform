'use client'

import { ReqStatus } from "@iluhander/uwu-react";
import { FC, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { IEngineProps } from "@/features/Novel/Engine/lib/types";

interface IEngineContainerProps {
  Engine: FC<IEngineProps>;
  playMode: boolean;
  fullScreenElems: string[];
}
import { LoadingDots } from "@/shared/Animated";

import s from './EngineContainer.module.scss';

const EngineContainer: FC<IEngineContainerProps> = ({ Engine, playMode, fullScreenElems }) => {
  const [engineStatus, setEngineStatus] = useState(ReqStatus.LOADING);
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
          <Engine playMode={playMode} setEngineStatus={setEngineStatus} className={unityClass} />
          {engineStatus === ReqStatus.LOADING && (
            <div className={s.engineContainer__loader}>
              <p> Загружаем движок </p>
              <LoadingDots count={3} />
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

'use client'

import { ReqStatus } from "@iluhander/uwu-react";
import { FC, useContext, useRef } from "react";
import { isMobile } from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { StrictClient } from "@/shared/common/ui";
import { ProgressionLoader } from "@/shared/Animated";
import { EngineContext } from "@/shared/common/lib/engine/EngineAPIProvider";

interface IEngineContainerProps {
  Engine: FC<any>;
  fullScreenElems: string[];
}

import s from './EngineContainer.module.scss';

const EngineContainer: FC<IEngineContainerProps> = ({ Engine, fullScreenElems }) => {
  const { engineStatus, loadingProgression } = useContext(EngineContext);
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
            className={unityClass}
          />
          {engineStatus === ReqStatus.LOADED && (
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

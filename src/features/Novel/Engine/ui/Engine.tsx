'use client'

/* eslint prefer-const:"off", jsx-a11y/click-events-have-key-events:"off", jsx-a11y/no-static-element-interactions:"off" */
import { FC, useState, useEffect, useContext } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

import getUnityBuild from '../api/getUnityBuild';

import { getEngineBasePath } from '@/shared/common/lib/engine/engineContext';
import EngineAPI from '@/shared/common/lib/engine/api';
import { IEngineProps } from '../lib/types';
import { EngineContext, EngineStatus } from '@/shared/common/lib/engine/EngineAPIProvider';

import './Engine.css';
import { P } from '@/shared/common/lib/dev/log';

const Engine: FC<IEngineProps> = ({
  className,
}) => {
  const { setLoadingProgression, setEngineStatus, playMode } = useContext(EngineContext);

  const basePath = getEngineBasePath();

  const { unityProvider, sendMessage, isLoaded, loadingProgression } = useUnityContext(
    getUnityBuild(playMode, basePath)
  );
  EngineAPI.instantiate();
  EngineAPI.add({ sendMessage });

  useEffect(() => {
    setLoadingProgression(loadingProgression);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setEngineStatus(EngineStatus.STARTED);
    }
  }, [isLoaded]);

  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);

  useEffect(() => {
    const updateDevicePixelRatio = () => setDevicePixelRatio(window.devicePixelRatio);

    const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);

    mediaMatcher.addEventListener('change', updateDevicePixelRatio);
    return () => mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
  }, [devicePixelRatio]);

  const unityCanvasId = "react-unity-webgl-canvas-2";
  const unityCanvas = document.getElementById(unityCanvasId);

  unityCanvas ? unityCanvas.id = "react-unity-webgl-canvas-1" : 0;

  return (
    <Unity className={className} unityProvider={unityProvider} devicePixelRatio={devicePixelRatio} />
  );
}

export default Engine;

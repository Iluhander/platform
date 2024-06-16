'use client'

/* eslint prefer-const:"off", jsx-a11y/click-events-have-key-events:"off", jsx-a11y/no-static-element-interactions:"off" */
import { FC, useState, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { ReqStatus } from '@iluhander/uwu-react';

import getUnityBuild from '../api/getUnityBuild';

import { getEngineBasePath } from '@/shared/common/lib/engine/engineContext';
import EngineAPI from '@/shared/common/lib/engine/api';
import { IEngineProps } from '../lib/types';

import './Engine.css';

const Engine: FC<IEngineProps> = ({
  playMode,
  className,
  setEngineStatus,
  setLoadingProgression
}) => {
  const basePath = getEngineBasePath();

  const { unityProvider, sendMessage, isLoaded, unload, loadingProgression } = useUnityContext(
    getUnityBuild(playMode, basePath)
  );
  EngineAPI.instantiate();
  EngineAPI.add({ sendMessage });

  useEffect(() => {
    setLoadingProgression(loadingProgression);
  }, [])

  useEffect(() => {
    if (isLoaded) {
      setEngineStatus(ReqStatus.LOADED);
    }
  }, [isLoaded]);

  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);

  useEffect(() => {
    const updateDevicePixelRatio = () => setDevicePixelRatio(window.devicePixelRatio);

    const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);

    mediaMatcher.addEventListener('change', updateDevicePixelRatio);
    return () => mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
  }, [devicePixelRatio]);

  return (
    <Unity className={className} unityProvider={unityProvider} devicePixelRatio={devicePixelRatio} />
  );
}

export default Engine;

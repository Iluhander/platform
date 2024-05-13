'use client'

/* eslint prefer-const:"off", jsx-a11y/click-events-have-key-events:"off", jsx-a11y/no-static-element-interactions:"off" */
import { FC, CSSProperties, Suspense, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { ReqStatus } from '@iluhander/uwu-react';

import getUnityBuild from '../api/getUnityBuild';

import { getEngineBasePath } from '@/shared/common/lib/engine/engineContext';
import EngineAPI from '@/shared/common/lib/engine/api';
import { IEngineProps } from '../lib/types';

import './Engine.css';

const Engine: FC<IEngineProps> = ({ playMode, className, setEngineStatus }) => {
  const basePath = getEngineBasePath();

  const { unityProvider, sendMessage, isLoaded, loadingProgression } = useUnityContext(
    getUnityBuild(playMode, basePath)
  );
  EngineAPI.instantiate();
  EngineAPI.add({ sendMessage });

  useEffect(() => {
    if (isLoaded) {
      setEngineStatus(ReqStatus.LOADED);
    }
  }, [isLoaded]);

  return (
    <Suspense fallback={<div />}>
      <Unity className={className} unityProvider={unityProvider} />
    </Suspense>
  );
}

export default Engine;

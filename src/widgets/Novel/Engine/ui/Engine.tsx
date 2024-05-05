'use client'

/* eslint prefer-const:"off", jsx-a11y/click-events-have-key-events:"off", jsx-a11y/no-static-element-interactions:"off" */
import { useState, useRef, FC, CSSProperties } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { isMobile } from 'react-device-detect';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import getUnityBuild from '../api/getUnityBuild';

import { LoadingCircle } from '@/shared/Animated';
import { getEngineBasePath } from '@/shared/common/lib/engine/engineContext';
import EngineAPI from '@/shared/common/lib/engine/api';

import './Engine.css';

const loadingCircleStyle: CSSProperties = {
  position: 'absolute',
  top: 'calc(50% - 22px)',
  left: 'calc(50% - 22px)'
};

interface IEngineProps {
  fullScreenElems: string[];
  playMode: boolean;
}

const Engine: FC<IEngineProps> = ({ playMode, fullScreenElems }) => {
  const screenHandle = useFullScreenHandle();
  const basePath = getEngineBasePath();

  const defaultContainerStyle = isMobile
  ? {
      width: 'max(60vw, 300px)',
      height: 'max(34vw, 168px)'
    }
  : {
      width: 'max(60vw, 600px)',
      height: 'max(34vw, 330px)'
    };

  const { unityProvider, sendMessage, isLoaded } = useUnityContext(
    getUnityBuild(playMode, basePath)
  );
  EngineAPI.instantiate();
  EngineAPI.add({ sendMessage });

  const engineBlock = useRef<HTMLDivElement>(null);

  async function zoomIn() {
    window.scroll(0, 0);

    await screenHandle.enter();
  }

  async function zoomOut() {
    window.scroll(0, 0);

    await screenHandle.exit();
  }

  const compStyle = screenHandle.active
    ? {
        containerStyle: {
          width: '99vw',
          height: '99vh'
        },
        unityStyle: {
          width: '100%',
          height: '100%',
          borderRadius: '0'
        }
      }
    : {
        containerStyle: defaultContainerStyle,
        unityStyle: {
          width: '100%',
          height: '100%',
          borderRadius: '8px'
        }
      };

  return (
    <div style={compStyle.containerStyle}>
      <FullScreen handle={screenHandle}>
        <div className="engineBlock" ref={engineBlock} style={compStyle.containerStyle}>
          <Unity style={compStyle.unityStyle} unityProvider={unityProvider} />
          {isLoaded === false && <LoadingCircle style={loadingCircleStyle} />}
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

export default Engine;

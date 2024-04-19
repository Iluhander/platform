'use client'

/* eslint prefer-const:"off", jsx-a11y/click-events-have-key-events:"off", jsx-a11y/no-static-element-interactions:"off" */
import { useState, useRef, FC, CSSProperties } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { isMobile } from 'react-device-detect';

import getUnityBuild from '../api/getUnityBuild';

import { LoadingCircle } from '@/shared/Animated';
import { getEngineBasePath } from '@/shared/common/lib/engine/engineContext';
import { provideEngineAPI } from '../../../../shared/common/lib/engine/api';

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

const Engine: FC<IEngineProps> = ({ fullScreenElems, playMode }) => {
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

  const defaultCompStyle = {
    containerStyle: defaultContainerStyle,
    unityStyle: {
      width: '100%',
      height: '100%',
      borderRadius: '8px'
    }
  };

  const [compStyle, setCompStyle] = useState(defaultCompStyle);
  const { unityProvider, sendMessage, isLoaded } = useUnityContext(
    getUnityBuild(playMode, basePath)
  );
  provideEngineAPI(undefined, undefined, sendMessage);

  const engineBlock = useRef<HTMLDivElement>(null);

  function zoomIn() {
    window.scroll(0, 0);

    // Hiding outer elements.
    fullScreenElems?.forEach((selector) => {
      const elem = document.querySelector(selector);
      (elem as HTMLDivElement).style.display = 'none';
    });

    setCompStyle({
      containerStyle: {
        width: '99vw',
        height: '99vh'
      },
      unityStyle: {
        width: '100%',
        height: '100%',
        borderRadius: '0'
      }
    });

    (engineBlock.current as HTMLDivElement).classList.add('zoomedIn');
  }

  function zoomOut() {
    // Showing outer elements.
    fullScreenElems?.forEach((selector) => {
      const elem = document.querySelector(selector);
      (elem as HTMLDivElement).style.display = '';
    });

    setCompStyle(defaultCompStyle);

    (engineBlock.current as HTMLDivElement).classList.remove('zoomedIn');
  }

  return (
    <div className="engineBlock" style={compStyle.containerStyle} ref={engineBlock}>
      <Unity style={compStyle.unityStyle} unityProvider={unityProvider} />
      {isLoaded === false && <LoadingCircle style={loadingCircleStyle} />}
      <div className="engineResize engineZoomIn" onClick={zoomIn} />
      <div className="engineResize engineZoomOut" onClick={zoomOut} />
    </div>
  );
}

export default Engine;

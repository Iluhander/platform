'use client'

import { FC, useEffect, useRef, useState } from 'react';

import LoaderStatus from '../utilities/LoaderStatus';
import LoadingCircle from './LoadingCircle';
import ELoaderStatus from '../utilities/LoaderStatus';

const minShowTime = 1500;

interface IMinTimeLoadingCircleProps {
  status: ELoaderStatus;
  className?: string;
}

const MinTimeLoadingCircle: FC<IMinTimeLoadingCircleProps> = (props) => {
  const lastShowCall = useRef(new Date().getTime());
  const [innerStatus, setInnerStatus] = useState(LoaderStatus.INITIALIZED);

  useEffect(() => {
    if (props.status === LoaderStatus.SHOWING) {
      lastShowCall.current = new Date().getTime();
      setInnerStatus(LoaderStatus.SHOWING);
    } else if (props.status === LoaderStatus.HIDDEN) {
      const usedTime = new Date().getTime() - lastShowCall.current;

      setTimeout(() => setInnerStatus(LoaderStatus.HIDDEN), Math.max(minShowTime - usedTime, 0));
    }
  }, [props.status]);

  switch (innerStatus) {
    case LoaderStatus.SHOWING:
      return <LoadingCircle {...props} className={`opacityAppear ${props.className}`} />;
    case LoaderStatus.HIDDEN:
      return <LoadingCircle {...props} className={`opacityDisappear ${props.className}`} />;
    default:
      return <div />;
  }
};

export default MinTimeLoadingCircle;

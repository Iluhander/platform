'use client'

import React, { CSSProperties, FC, useEffect, useRef } from 'react';

import SmoothHidingItemStatus from './SmoothHidingItemStatus';

interface ISmoothHidingItemProps {
  status: number;
  setStatus: (newStatus: number) => void;
  style?: CSSProperties;
  className?: string;
  children: React.ReactNode;
}

const SmoothHidingItem: FC<ISmoothHidingItemProps> = (props) => {
  const { status, setStatus } = props;

  const innerStyle: CSSProperties = { ...(props.style || {}) };
  if (!innerStyle.animationDuration) {
    innerStyle.animationDuration = `0.5s`;
  }

  if (status === SmoothHidingItemStatus.HIDDEN) {
    innerStyle.display = 'none';
  }

  const changeDisplayTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (changeDisplayTimer.current) {
      clearTimeout(changeDisplayTimer.current);
    }

    let nextStatus: number;
    if (status === SmoothHidingItemStatus.APPEARING) {
      nextStatus = SmoothHidingItemStatus.VISIBLE;
    } else if (status === SmoothHidingItemStatus.DISAPPEARING) {
      nextStatus = SmoothHidingItemStatus.HIDDEN;
    } else {
      return;
    }

    const animationTime = parseFloat(innerStyle.animationDuration as string);
    changeDisplayTimer.current = setTimeout(() => {
      setStatus(nextStatus);
    }, animationTime * 1000 * 0.8);
  }, [status]);

  let innerClassName = props.className;
  if (status === SmoothHidingItemStatus.APPEARING) {
    innerClassName += ' opacityAppear';
  } else if (status === SmoothHidingItemStatus.DISAPPEARING) {
    innerClassName += ' opacityDisappear';
  }

  const modifiedProps = { style: innerStyle, className: innerClassName };

  return (
    <div {...modifiedProps}>{props.children}</div>
  );
}

export default SmoothHidingItem;

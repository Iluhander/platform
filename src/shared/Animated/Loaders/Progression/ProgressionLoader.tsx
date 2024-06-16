'use client'

import { FC, useEffect, useRef } from "react";

import s from './progressionLoader.module.scss';

const ProgressionLoader: FC<{ max: number, cur: number }> = ({ max, cur }) => {
  const lastValue = useRef(0);
  useEffect(() => {
    lastValue.current = cur;
  }, [cur]);

  const dots = Array(max);
  for (let i = 0; i < max; i += 1) {
    if (i < lastValue.current) {
      dots[i] = (
        <span
          key={`pl${max}${cur}${i}`}
          style={{ color: 'var(--main-color)' }}
          className={s.progressionLoader__it}
        >
          ■
        </span>
      );
    } else if (i < cur) {
      dots[i] = (
        <span
          key={`pl${max}${cur}${i}`}
          className={`${s.progressionLoader__itColored} ${s.progressionLoader__it}`}
        >
          ■
        </span>
      );
    } else {
      dots[i] = (
        <span
          key={`pl${max}${cur}${i}`}
          style={{ color: 'white' }}
          className={s.progressionLoader__it}
        >
          ■
        </span>
      );
    }
  }

  return <div>{dots}</div>;
};

export default ProgressionLoader;

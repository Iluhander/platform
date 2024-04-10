"use client"

import { FC } from 'react';

import './globals.scss';
import './ErrorFallback.css';

interface IErrorFallbackProps {}

const ErrorFallback: FC<IErrorFallbackProps> = () => {
  return (
    <div className="errorFallback">
      <h2>Злостные баги что-то сломали ! Перезагрузите страницу</h2>
      <img
        className="errorFallbackBug"
        src="icons/bug.png"
        alt=""
        style={{
          width: 100,
          height: 100,
          top: -10,
          left: 20,
          transform: 'rotate(30deg)'
        }}
      />
      <img
        className="errorFallbackBug"
        src="icons/bug.png"
        alt=""
        style={{
          width: 120,
          height: 120,
          bottom: -10,
          right: 20,
          transform: 'rotate(-70deg)'
        }}
      />
      <img
        className="errorFallbackBug"
        src="icons/bug.png"
        alt=""
        style={{
          width: 100,
          height: 100,
          bottom: 110,
          left: 40,
          transform: 'rotate(10deg)'
        }}
      />
      <img
        className="errorFallbackBug"
        src="icons/bug.png"
        alt=""
        style={{
          width: 100,
          height: 100,
          top: 90,
          right: 30,
          transform: 'rotate(170deg)'
        }}
      />

      <button onClick={() => window.location.reload()}>⟳</button>
    </div>
  );
};

export default ErrorFallback;

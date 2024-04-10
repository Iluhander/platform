import { FC, useEffect, useRef } from 'react';
import { EModalStatus } from '../../lib';
import { IDefaultModalProps } from '../../lib';

import './GlobalModal.scss';

const GlobalModal: FC<IDefaultModalProps> = ({ heading, text, options, status }) => {
  const globalModalBack = useRef(null);
  const firstButton = useRef<HTMLButtonElement>(null);

  const optionsButtons = options.map((option, i) =>
    i ? (
      <button
        onClick={option.action}
        key={option.key || `mo${i}`}
        type="button"
        className={`${option.className} highlighted`}
        style={option.style}
      >
        {option.text}
      </button>
    ) : (
      <button
        onClick={option.action}
        key={option.key || `mo${i}`}
        type="button"
        className={`${option.className} highlighted`}
        style={option.style}
        tabIndex={-1}
        ref={firstButton}
      >
        {option.text}
      </button>
    )
  );

  useEffect(() => {
    firstButton.current?.focus();
  }, []);

  return (
    <div className={`globalModal ${status === EModalStatus.HIDING ? 'hiding' : ''}`}>
      <div className="globalModalBack opacityAppear" ref={globalModalBack}>
        <div className="globalModalContent">
          {heading && <h1 className={heading.className}>{heading.text}</h1>}
          <p>{text}</p>
          <div className="globalModalOptions">{optionsButtons}</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;

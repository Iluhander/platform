import { FC, useMemo } from 'react';
import { EModalStatus, IDefaultModalProps } from '../../lib';

import './NonBlockingModal.scss';

const NonBlockingModal: FC<IDefaultModalProps> = ({ heading, text, options, status }) => {
  const optionsButtons = useMemo(() => options.map((option, i) => (
    <button
      onClick={option.action}
      key={option.key || `mo${i}`}
      type="button"
      className={`${option.className} highlighted`}
      style={option.style}
    >
      {option.text}
    </button>
  )), []);

  return (
    <div
      className={`nonBlockingModal ${status === EModalStatus.HIDING ? 'hiding' : 'opacityAppear'}`}
    >
      {heading && <h1 className={heading.className}>{heading.text}</h1>}
      <p>{text}</p>
      <div className="nonBlockingModalOptions">{optionsButtons}</div>
    </div>
  );
}

export default NonBlockingModal;

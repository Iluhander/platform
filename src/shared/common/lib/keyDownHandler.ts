import { commonKeyDownHandler } from '@iluhander/uwu-react';
import { KeyboardEventHandler } from 'react';

const keyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
  // @ts-ignore
  if (!window || window.engineLoaded === false) {
    return commonKeyDownHandler(e);
  }
}

export default keyDownHandler;

import { useState, useContext, useRef, FC } from 'react';

import Button from '@/shared/Button/Button';
import { LoadingCircle } from '@/shared/Animated';

import NovelModMenuStatus from '../lib/NovelModMenuStatus';
import EButtonState from '@/shared/Button/ButtonState';
import { ModalContext, EModalStatus, EModalVariant } from '@/shared/Modal/lib';
import modHideNovel from '../api/modHideNovel';
import keyDownHandler from '@/shared/common/lib/keyDownHandler';

import './NovelModMenu.css';

interface INovelModHideMenuProps {
  novelId: string;
}

const NovelModHideMenu: FC<INovelModHideMenuProps> = ({ novelId }) => {
  const { setModalData, removeModal } = useContext(ModalContext);
  const [status, setStatus] = useState(NovelModMenuStatus.AVAILABLE);
  const reasonInputRef = useRef<HTMLTextAreaElement>(null);

  const handleModHide = () => {
    setStatus(NovelModMenuStatus.LOADING);
    modHideNovel(novelId, (reasonInputRef.current as HTMLTextAreaElement).value)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setStatus(NovelModMenuStatus.AVAILABLE);
        setModalData({
          status: EModalStatus.VISIBLE,
          variant: EModalVariant.NON_BLOCKING,
          propsData: {
            heading: { text: 'Ошибка скрытия' },
            text: 'Попробуйте ещё раз',
            options: [
              {
                text: 'Ок',
                className: 'niceButton',
                style: { padding: '10px 20px' },
                action: () => removeModal()
              }
            ]
          }
        });
      });
  };

  switch (status) {
    case NovelModMenuStatus.AVAILABLE:
      return (
        <div className="novelModMenu">
          ...
          <div className="novelModMenuMore">
            <Button
              className="highlighted"
              status={
                status === NovelModMenuStatus.LOADING ? EButtonState.LOADING : EButtonState.AVAILABLE
              }
              onClick={() => setStatus(NovelModMenuStatus.CONFIRM)}
            >
              Скрыть новеллу
            </Button>
          </div>
        </div>
      );
    case NovelModMenuStatus.CONFIRM:
      return (
        <div className="novelModMenu">
          ...
          <div className="novelModMenuMore">
            <form>
              <textarea
                placeholder="Причина"
                ref={reasonInputRef}
                onKeyDown={keyDownHandler}
                required
              />
              <Button
                className="highlighted"
                type="submit"
                status={
                  status === NovelModMenuStatus.LOADING
                    ? EButtonState.LOADING
                    : EButtonState.AVAILABLE
                }
                onClick={handleModHide}
              >
                Подтвердить
              </Button>
            </form>
          </div>
        </div>
      );
    default:
      return <LoadingCircle />;
  }
};

export default NovelModHideMenu;

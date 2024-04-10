import { useState, useContext, FC } from 'react';

import Button from '@/shared/Button/Button';
import { LoadingCircle } from '@/shared/Animated';

import NovelModMenuStatus from '../lib/NovelModMenuStatus';
import EButtonState from '@/shared/Button/ButtonState';
import { ModalContext, EModalStatus, EModalVariant } from '@/shared/Modal/lib';
import modShowNovel from '../api/modShowNovel';

import './NovelModMenu.css';

interface INovelModShowMenuProps {
  novelId: string;
}

const NovelModShowMenu: FC<INovelModShowMenuProps> = ({ novelId }) => {
  const { setModalData, removeModal } = useContext(ModalContext);
  const [status, setStatus] = useState(NovelModMenuStatus.AVAILABLE);

  const handleModShow = () => {
    setStatus(NovelModMenuStatus.LOADING);
    modShowNovel(novelId)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setStatus(NovelModMenuStatus.AVAILABLE);
        setModalData({
          status: EModalStatus.VISIBLE,
          variant: EModalVariant.NON_BLOCKING,
          propsData: {
            heading: { text: 'Ошибка' },
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
              Открыть новеллу
            </Button>
          </div>
        </div>
      );
    case NovelModMenuStatus.CONFIRM:
      return (
        <div className="novelModMenu">
          ...
          <div className="novelModMenuMore">
            <Button
              className="highlighted"
              status={
                status === NovelModMenuStatus.LOADING ? EButtonState.LOADING : EButtonState.AVAILABLE
              }
              onClick={handleModShow}
            >
              Подтвердить
            </Button>
          </div>
        </div>
      );
    default:
      return <LoadingCircle />;
  }
};

export default NovelModShowMenu;

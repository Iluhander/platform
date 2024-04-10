import { useState, useContext, useRef, FC } from 'react';

import Button from '@/shared/Button/Button';
import { LoadingCircle } from '@/shared/Animated';

import PostModMenuStatus from '../lib/PostModMenuStatus';
import EButtonState from '@/shared/Button/ButtonState';
import { ModalContext, EModalStatus, EModalVariant } from '@/shared/Modal/lib';
import modHidePost from '../api/modHidePost';
import keyDownHandler from '@/shared/common/lib/keyDownHandler';

import './PostModMenu.css';

interface IPostModHideMenuProps {
  postId: string;
}

const PostModHideMenu: FC<IPostModHideMenuProps> = ({ postId }) => {
  const { setModalData, removeModal } = useContext(ModalContext);
  const [status, setStatus] = useState(PostModMenuStatus.AVAILABLE);
  const reasonInputRef = useRef<HTMLTextAreaElement>(null);

  const handleModHide = () => {
    setStatus(PostModMenuStatus.LOADING);
    modHidePost(postId, (reasonInputRef.current as HTMLTextAreaElement).value)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setStatus(PostModMenuStatus.AVAILABLE);
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
    case PostModMenuStatus.AVAILABLE:
      return (
        <div className="postModMenu">
          ...
          <div className="postModMenuMore">
            <Button
              className="highlighted"
              status={
                status === PostModMenuStatus.LOADING ? EButtonState.LOADING : EButtonState.AVAILABLE
              }
              onClick={() => setStatus(PostModMenuStatus.CONFIRM)}
            >
              Скрыть пост
            </Button>
          </div>
        </div>
      );
    case PostModMenuStatus.CONFIRM:
      return (
        <div className="postModMenu">
          ...
          <div className="postModMenuMore">
            <form>
              <textarea
                placeholder="Причина"
                ref={reasonInputRef}
                onKeyDown={keyDownHandler}
                required
              />
              <Button
                className="highlighted"
                type="button"
                status={
                  status === PostModMenuStatus.LOADING ? EButtonState.LOADING : EButtonState.AVAILABLE
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

export default PostModHideMenu;

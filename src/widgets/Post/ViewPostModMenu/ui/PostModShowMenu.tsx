import { useState, useContext, FC } from 'react';

import Button from '@/shared/Button/Button';
import { LoadingCircle } from '@/shared/Animated';

import PostModMenuStatus from '../lib/PostModMenuStatus';
import EButtonState from '@/shared/Button/ButtonState';
import { ModalContext, EModalVariant, EModalStatus } from '@/shared/Modal/lib';
import modShowPost from '../api/modShowPost';

import './PostModMenu.css';

interface IPostModShowMenuProps {
  postId: string;
}

const PostModShowMenu: FC<IPostModShowMenuProps> = ({ postId }) => {
  const { setModalData, removeModal } = useContext(ModalContext);
  const [status, setStatus] = useState(PostModMenuStatus.AVAILABLE);

  const handleModShow = () => {
    setStatus(PostModMenuStatus.LOADING);
    modShowPost(postId)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setStatus(PostModMenuStatus.AVAILABLE);
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
              Открыть пост
            </Button>
          </div>
        </div>
      );
    case PostModMenuStatus.CONFIRM:
      return (
        <div className="postModMenu">
          ...
          <div className="postModMenuMore">
            <Button
              className="highlighted"
              status={
                status === PostModMenuStatus.LOADING ? EButtonState.LOADING : EButtonState.AVAILABLE
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

export default PostModShowMenu;

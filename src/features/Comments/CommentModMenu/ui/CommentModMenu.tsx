import { useState, useContext, FC } from 'react';

import ECommentModMenuStatus from '../lib/CommentModMenuStatus';
import modDeleteComment from '../api/modDeleteComment';
import { ModalContext, EModalVariant, EModalStatus } from '@/shared/Modal/lib';
import EButtonState from '@/shared/Button/ButtonState';

import Button from '@/shared/Button/Button';
import { LoadingCircle } from '@/shared/Animated';

import './CommentModMenu.css';

interface ICommentModMenuProps {
  commentId: string;
}

const CommentModMenu: FC<ICommentModMenuProps> = ({ commentId }) => {
  const { setModalData, removeModal } = useContext(ModalContext);
  const [status, setStatus] = useState(ECommentModMenuStatus.AVAILABLE);

  const handleModDelete = () => {
    setStatus(ECommentModMenuStatus.LOADING);
    modDeleteComment(commentId)
      .then(() => {
        setStatus(ECommentModMenuStatus.DELETED);
      })
      .catch(() => {
        setStatus(ECommentModMenuStatus.AVAILABLE);
        setModalData({
          status: EModalStatus.VISIBLE,
          variant: EModalVariant.NON_BLOCKING,
          propsData: {
            heading: { text: 'Ошибка удаления' },
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
    case ECommentModMenuStatus.AVAILABLE:
      return (
        <div className="commentModMenu">
          ...
          <div className="commentModMenuMore">
            <Button
              className="highlighted"
              status={EButtonState.AVAILABLE}
              onClick={() => setStatus(ECommentModMenuStatus.CONFIRM)}
            >
              Удалить комментарий
            </Button>
          </div>
        </div>
      );
    case ECommentModMenuStatus.CONFIRM:
      return (
        <div className="commentModMenu">
          ...
          <div className="commentModMenuMore">
            <Button
              className="highlighted"
              status={EButtonState.AVAILABLE}
              onClick={handleModDelete}
            >
              Подтвердите удаление
            </Button>
          </div>
        </div>
      );
    case ECommentModMenuStatus.DELETED:
      return (
        <div className="commentModMenu">
          <img src="/icons/cancel.png" alt="Deleted" />
        </div>
      );
    default:
      return <LoadingCircle />;
  }
};

export default CommentModMenu;

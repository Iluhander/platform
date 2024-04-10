import { FC, useContext, useMemo, useRef, useState } from 'react';

// Utilities.
import checkIsMobile from '@/shared/common/lib/checkIsMobile';
import { CommentsContext } from '@/shared/common/lib/comment/CommentsContext';
import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';
import useShowModal from '@/shared/Modal/lib/useShowModal';
import { EShowModalType } from '@/shared/Modal/lib';
import { commentsPerPage } from '@/backend/shared/utilities/constants';

// Components.
import { CommentsList } from '@/entities/Comments/CommentsList';
import { CommentBlock } from '@/features/Comments/CommentBlock';
import { CommentForm } from '@/features/Comments/CommentForm';

// Styles.
import './Comments.scss';

const Comments: FC<{ count?: number }> = ({ count = Infinity }) => {
  const { userData } = useContext(UserDataContext);
  const setShowModalData = useShowModal();
  const [currentlyReplyingTo, setCurrentlyReplyingTo] = useState<string | null>(null);
  const [maxCount, setMaxCount] = useState(count);
  const commentsRef = useRef(null);

  const context = useMemo(
    () => ({
      commentsPerPage,
      currentlyReplyingTo,
      setMaxCount,
      callReplyTo: (to: string | null) => {
        if (userData.status === EUserDataStatus.NOT_AUTHENTICATED) {
          setShowModalData(EShowModalType.NOT_AUTHENTICATED);
        } else if (!userData.isActivated) {
          setShowModalData(EShowModalType.NOT_ACTIVATED);
        } else {
          setCurrentlyReplyingTo(to);
        }
      },
      commentsRef
    }),
    [currentlyReplyingTo, userData]
  );

  return (
    <CommentsContext.Provider value={context}>
      <section className={`novelComments ${checkIsMobile() ? 'novelCommentsMobile' : ''}`}>
        <div className={checkIsMobile() ? 'commentSizedMobile' : 'commentSized'}>
          <h2>Комментарии{maxCount && maxCount !== Infinity ? ` (${maxCount})` : ''}:</h2>
        </div>
        <CommentsList
          CommentBlock={CommentBlock}
          CommentForm={CommentForm}
        />
        {maxCount === 0 ? <p>Пока что комментариев нет</p> : <div />}
      </section>
    </CommentsContext.Provider>
  );
};

export default Comments;

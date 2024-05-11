'use client'

import { FC, useContext, useMemo, useRef, useState } from 'react';

// Utilities.
import { CommentsContext } from '@/shared/common/lib/comment/CommentsContext';
import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';
import { useShowModal } from '@/shared/Modal/lib';
import { EShowModalType } from '@/shared/Modal/lib';
import { commentsPerPage } from '@/shared/common/model/constants';
import { Device } from '@/shared/common/ui';

// Components.
import { CommentsList } from '@/entities/Comments/CommentsList';
import { CommentBlock } from '@/entities/Comments/CommentBlock';
import { CommentForm } from '@/features/Comments/CommentForm';
import { CommentReplies } from '@/entities/Comments/CommentReplies';

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

  const list = (
    <>
      <CommentsList
        CommentBlock={CommentBlock}
        CommentForm={CommentForm}
        CommentReplies={CommentReplies}
      />
      {maxCount === 0 ? <p>Пока что комментариев нет</p> : <div />}
    </>
  );

  const commentCountElem = (
    <h2>
      Комментарии{maxCount && maxCount !== Infinity ? (
          <>
            {' '}&#40;<span itemProp="reviewCount">{maxCount}</span>&#41;
          </>
        ) :
        ''
      }:
    </h2>
  );

  return (
    <CommentsContext.Provider value={context}>
      <Device>  
        {({ isMobile }) => isMobile ? (
          <section className="novelComments novelCommentsMobile">
            <div className="commentSized">
              {commentCountElem}
            </div>
            {list}
          </section>
        ) : (
          <section className="novelComments">
            <div className="commentSized">
              {commentCountElem}
            </div>
            {list}
          </section>
        )}
      </Device>
    </CommentsContext.Provider>
  );
};

export default Comments;

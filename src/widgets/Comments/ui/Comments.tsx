'use client'

import { FC, useContext, useMemo, useRef, useState } from 'react';
import { BrowserView, MobileOnlyView } from 'react-device-detect';

// Utilities.
import { CommentsContext } from '@/shared/common/lib/comment/CommentsContext';
import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';
import useShowModal from '@/shared/Modal/lib/useShowModal';
import { EShowModalType } from '@/shared/Modal/lib';
import { commentsPerPage } from '@/shared/common/model/constants';

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

  const list = (
    <>
      <CommentsList
        CommentBlock={CommentBlock}
        CommentForm={CommentForm}
      />
      {maxCount === 0 ? <p>Пока что комментариев нет</p> : <div />}
    </>
  );

  return (
    <CommentsContext.Provider value={context}>
      <BrowserView>
        <section className="novelComments">
          <div className="commentSized">
            <h2>
              Комментарии{maxCount && maxCount !== Infinity ? <span itemProp="reviewCount"> ${maxCount}</span> : ''}:
            </h2>
          </div>
          {list}
        </section>
      </BrowserView>
      <MobileOnlyView>
        <section className="novelComments novelCommentsMobile">
          <div className="commentSizedMobile">
            <h2>Комментарии{maxCount && maxCount !== Infinity ? <span itemProp="reviewCount"> ${maxCount}</span> : ''}:</h2>
          </div>
          {list}
        </section>
      </MobileOnlyView>
    </CommentsContext.Provider>
  );
};

export default Comments;

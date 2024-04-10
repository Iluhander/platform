// External.
import { FC, useContext, useEffect, useState } from 'react';

// Utilities.
import { UserDataContext } from '@/shared/common/lib/user/userData';
import { CommentsContext } from '@/shared/common/lib/comment/CommentsContext';
import { IComment } from '@/shared/common/model/comment';
import { CommentContext } from '@/shared/common/lib/comment/СommentContext';
import CommentModMenu from '@/features/Comments/CommentModMenu/ui/CommentModMenu';

// Components.
import CommentsReplies from '../../CommentsReplies/CommentReplies';
import Comment from '@/shared/Comments/Comment/Comment';
import { CommentForm } from '@/features/Comments/CommentForm';

import './CommentBlock.scss';

interface ICommentBlockProps {
  comment: IComment;
  index: number;
  increaseCommentsCount: (comment: string) => void; 
}

const CommentBlock: FC<ICommentBlockProps> = ({ comment, index, increaseCommentsCount }) => {
  const { userData } = useContext(UserDataContext);
  const { callReplyTo, currentlyReplyingTo } = useContext(CommentsContext);
  const [repliesHidden, setRepliesHidden] = useState(true);
  const [maxCount, setMaxCount] = useState(comment.repliesCount);

  useEffect(() => {
    setMaxCount(comment.repliesCount);
  }, [comment.repliesCount]);

  if (!comment) {
    return <div />;
  }

  let repliesElement;
  if (!maxCount) {
    repliesElement = <div />;
  } else if (repliesHidden) {
    repliesElement = (
      <div className="commentRepliesControl">
        <button
          type="button"
          className="textButton highlighted"
          onClick={() => setRepliesHidden(false)}
        >
          Показать ответы {`(${maxCount})`}
        </button>
      </div>
    );
  } else {
    repliesElement = (
      <>
        <CommentsReplies setMaxCount={setMaxCount} />
        <div className="commentRepliesControl">
          <button
            type="button"
            className="textButton highlighted"
            onClick={() => setRepliesHidden(true)}
          >
            Скрыть ответы
          </button>
        </div>
      </>
    );
  }

  return (
    <CommentContext.Provider value={comment}>
      <Comment
        comment={comment}
        callReplyTo={callReplyTo}
        isReplying={currentlyReplyingTo === comment.id}
        elemStyle={{ animationDuration: `${0.7 * index}s` }}
        isOnLowerLevel={false}
        menuComponent={userData.role === 'mod' ? <CommentModMenu commentId={comment.id} /> : <div />}
      />
      {repliesHidden && currentlyReplyingTo === comment.id && (
        <CommentForm
          key="crf"
          callReplyTo={callReplyTo}
          callCommentsRefetch={() => increaseCommentsCount(comment.id)}
          className="replyForm"
          style={{}}
        />
      )}
      {repliesElement}
    </CommentContext.Provider>
  );
};

export default CommentBlock;

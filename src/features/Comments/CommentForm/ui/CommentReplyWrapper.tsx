import { FC, useContext } from 'react';

import { CommentsContext } from '@/shared/common/lib/comment/CommentsContext';
import { UserDataContext } from '@/shared/common/lib/user/userData';
import { IComment } from '@/shared/common/model/comment';

import Comment from '@/shared/Comments/Comment/Comment';
import { CommentForm } from '..';
import CommentModMenu from '../../CommentModMenu/ui/CommentModMenu';

interface ICommentReplyWrapperProps {
  comment: IComment;
  index: number;
  callCommentsRefetch: () => void;
  isOnLowerLevel: boolean;
}

const CommentReplyWrapper: FC<ICommentReplyWrapperProps> = ({
  comment,
  index,
  callCommentsRefetch,
  isOnLowerLevel
}) => {
  const { callReplyTo, currentlyReplyingTo } = useContext(CommentsContext);
  const { userData } = useContext(UserDataContext);

  return (
    <>
      <Comment
        comment={comment}
        callReplyTo={callReplyTo}
        isReplying={currentlyReplyingTo === comment.id}
        elemStyle={{ animationDuration: `${0.7 * index}s` }}
        isOnLowerLevel={isOnLowerLevel}
        menuComponent={userData.role === 'mod' ? <CommentModMenu commentId={comment.id} /> : <div />}
      />
      {currentlyReplyingTo === comment.id && (
        <CommentForm
          key="crf"
          callReplyTo={callReplyTo}
          callCommentsRefetch={callCommentsRefetch}
          className="replyForm"
          style={{}}
        />
      )}
    </>
  );
};

export default CommentReplyWrapper;

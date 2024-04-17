import { CSSProperties, FC, ReactNode } from 'react';
import { DefaultUserName } from '@/shared/common/lib/user/userData';
import { IComment } from '@/shared/common/model/comment';
import Device from '@/shared/common/ui/Device';

import './Comment.scss';

const handleUserName = (username: string) => (username ? `${username}` : DefaultUserName);

interface ICommentProps {
  comment: IComment;
  callReplyTo: (to: string | null) => void;
  isReplying: boolean;
  elemStyle: CSSProperties;
  isOnLowerLevel: boolean;
  menuComponent: ReactNode;
}

const Comment: FC<ICommentProps> = ({
  comment,
  callReplyTo,
  isReplying,
  elemStyle,
  isOnLowerLevel,
  menuComponent
}) => {
  let sizeClass = 'commentSized';
  if (isOnLowerLevel) {
    sizeClass = 'lowerLevelSized';
  }

  const authorNameHandled = handleUserName(comment.author?.username);
  const replyToNameHandled = comment.replyToComment
    ? handleUserName(comment.replyToComment.author?.username)
    : '';

  const avatarURL = `${process.env.NEXT_PUBLIC_ASSETS}/static/avatar/${comment.author?.id}?v=${comment.author?.avatarVersion}`;

  return (
    <article
      style={elemStyle}
      className={`novelComment ${sizeClass}`}
      itemType="https://schema.org/Comment"
      itemProp="review"
    >
      <div className="commentHead">
        <a
          href={`/viewprofile?id=${comment.author?.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={avatarURL} alt="User" className="authorMiniAvatar" />
        </a>
        <div className="commentHeadBlock">
          <div>
            <a
              href={`/viewprofile?id=${comment.author?.id}`}
              itemProp="author"
              target="_blank"
              rel="noreferrer"
            >{`${authorNameHandled}`}</a>
            {replyToNameHandled && (
              <Device>
                {({ isMobile }) => !isMobile ? (
                  <>
                    <span style={{ margin: '0 4px' }}>→</span>
                    <a
                      href={`/viewprofile?id=${comment.replyToComment.author?.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`${replyToNameHandled}`}
                    </a>
                  </>
                ) : (
                  <div />
                )}
              </Device>
            )}
          </div>
          <p itemProp="datePublished" title="Дата публикации">
            {comment.date}
          </p>
        </div>
        <div className="commentReplyBlock">
          {menuComponent}
          <button
            className="highlightedImg"
            type="button"
            onClick={(e) => {
              e.preventDefault();

              callReplyTo(isReplying ? null : comment.id);
            }}
          >
            {!isReplying ? (
              <img src="/icons/reply.png" alt="reply" />
            ) : (
              <img src="/icons/cancel.png" alt="cancel replying" />
            )}
          </button>
        </div>
      </div>
      <div className="commentBody">
        <p className="commentText" itemProp="reviewBody">
          {comment.text}
        </p>
        {comment.img && <img src={comment.img} alt="commentImage" />}
      </div>
    </article>
  );
}

export default Comment;

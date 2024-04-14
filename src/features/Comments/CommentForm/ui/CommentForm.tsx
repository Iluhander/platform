/* eslint jsx-a11y/click-events-have-key-events: "off", jsx-a11y/no-noninteractive-element-interactions: "off", no-loop-func: "off" */

import { CSSProperties, FC, FormEventHandler, useContext, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

// Utilities.
import keyDownHandler from '@/shared/common/lib/keyDownHandler';
import { UserDataContext } from '@/shared/common/lib/user/userData';
import CommentPostStatus from '../lib/CommentPostStatus';
import useSendComment from '@/shared/common/api/comment/useSendComment';
import CreateCommentDto from '@/shared/common/api/comment/CreateCommentDto';

// Components.
import { LoadingDots, SpanList } from '@/shared/Animated';

// Styles.
import './CommentForm.css';

interface ICommentFormMockProps {
  text: string;
  href?: string;
  tag?: string;
  style: CSSProperties;
}

const CommentFormMock: FC<ICommentFormMockProps> = ({ text, href, tag, style }) => {
  return (
    <div
      className={`commentFormMock ${isMobile ? 'commentSizedMobile' : 'commentSized'}`}
      style={style}
    >
      <SpanList href={href} text={text} tag={tag} />
    </div>
  );
};

interface ICommentFormProps {
  callReplyTo: (to: string | null) => void;
  callCommentsRefetch: () => void;
  className: string;
  style: CSSProperties;
}

const CommentForm: FC<ICommentFormProps> = ({ callReplyTo, callCommentsRefetch, className, style }) => {
  const { status, exec, available } = useSendComment();
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    if (status === CommentPostStatus.LOADING) {
      return;
    }

    if (status === CommentPostStatus.LOADED) {
      callCommentsRefetch();
    }

    if (status !== CommentPostStatus.INITIALIZED) {
      callReplyTo(null);
    }
  }, [status]);

  // Handling form right after sending a comment.
  let sendElem;
  switch (true) {
    case status === CommentPostStatus.NOT_AUTHENTICATED:
      return <CommentFormMock text="Войдите, чтобы комментировать" href="/login" style={style} />;
    case status === CommentPostStatus.NOT_ACTIVATED:
      return (
        <CommentFormMock
          text="Активируйте аккаунт в письме на почте, чтобы комментировать"
          tag="h3"
          style={style}
        />
      );
    case status === CommentPostStatus.LOADING:
      sendElem = <LoadingDots />;
      break;
    case status === CommentPostStatus.LOADED && !available:
      sendElem = <p style={{ color: 'var(--main-color)' }}>✓ Отправлено</p>;

      break;
    default:
      sendElem = (
        <button type="submit" className="niceButton radial2">
          Отправить
        </button>
      );
      break;
  }

  const onCommentSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!available) {
      return;
    }

    exec(new CreateCommentDto(
      ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value
    ));

    ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value = '';
  };

  const userAvatarURL = `${process.env.NEXT_PUBLIC_BACKEND}/static/avatar/${userData.id}?v=${userData.avatarVersion}`;

  return (
    <form
      className={`novelCommentForm ${isMobile ? 'commentSizedMobile' : 'commentSized'} ${
        className || ''
      }`}
      onSubmit={onCommentSubmit}
      style={style}
    >
      <img src={userAvatarURL} alt="User" className="authorMiniAvatar" />
      <textarea
        onKeyDown={keyDownHandler}
        placeholder="Ваш комментарий..."
        maxLength={256}
        cols={40}
        rows={4}
        style={{ height: '72px', maxWidth: isMobile ? '290px' : 'unset' }}
        required
      />
      <div>{sendElem}</div>
    </form>
  );
};

export default CommentForm;

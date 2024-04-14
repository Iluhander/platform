import Link from 'next/link';
import { IPost } from '@/shared/common/model/forum';
import { ViewReaction } from '@/shared/Reactions';

import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import './PostCard.scss';

interface IPostCardProps {
  data: IPost;
  reaction: number;
}

const PostCard: FC<IPostCardProps> = ({ data, reaction }) => {
  if (!data) {
    return <div />;
  }

  const commonContent = (
    <>
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND}/static/post/cover/${data.id}?v=${data.coverVersion}`}
        alt=""
        className="postHeaderCover"
      />
      <div className="postCardContent">
        <h2 itemProp="name">{data.title}</h2>
        <div className="postCardMeta">
          <p itemProp="category">{data.subForum?.name}</p>
          <p>•</p>
          <p>{data.author?.username}</p>
        </div>
        <div className="postCardReaction">
          <div>
            <ViewReaction reaction={reaction} likesCount={data.likesCount} />
          </div>
          {data.commentsCount && data.commentsCount > 0 ? (
            <div className="postCardReplies">
              <img src="/icons/replywhite.png" alt="replies" />
              <p>{data.commentsCount}</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );

  return (
    <Link href={`/post/${data.id}`}>
      <article
        className={`postCard ${isMobile ? 'postCardMobile' : ''}`}
        itemScope
        itemType="https://schema.org/Article"
      >
        {commonContent}
      </article>
    </Link>
  );
};

export default PostCard;

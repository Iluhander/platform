import Link from 'next/link';
import checkIsMobile from '@/shared/common/lib/checkIsMobile';
import { IPost } from '@/shared/common/model/forum';
import { ViewReaction } from '@/shared/Reactions';

import './PostCard.scss';
import { FC } from 'react';

interface IPostCardProps {
  data: IPost;
  reaction: number;
}

const PostCard: FC<IPostCardProps> = ({ data, reaction }) => {
  if (!data) {
    return <div />;
  }

  const isMobile = checkIsMobile();

  return (
    <Link href={`/post?id=${data.id}`}>
      <div className={`postCard ${isMobile ? 'postCardMobile' : ''}`}>
        <img
          src={`${process.env.REACT_APP_BACKEND}/static/post/cover/${data.id}?v=${data.coverVersion}`}
          alt=""
          className="postHeaderCover"
        />
        <div className="postCardContent">
          <h2>{data.title}</h2>
          <div className="postCardMeta">
            <p>{data.subForum?.name}</p>
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
      </div>
    </Link>
  );
};

export default PostCard;

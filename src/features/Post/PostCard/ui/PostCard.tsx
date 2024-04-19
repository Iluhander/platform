import { IPost } from '@/shared/common/model/forum';
import { ViewReaction } from '@/shared/Reactions';

import { FC } from 'react';

import s from './PostCard.module.scss';
import { D, P } from '@/shared/common/lib/dev/log';

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
        src={`${process.env.NEXT_PUBLIC_ASSETS}/static/post/cover/${data.id}?v=${data.coverVersion}`}
        className={s.postCard__cover}
        itemProp="image"
      />
      <div className={s.postCard__content}>
        <h2 itemProp="name">{data.title}</h2>
        <div className={s.postCard__meta}>
          <p itemProp="category">{data.subForum?.name}</p>
          <p>•</p>
          <p>{data.author?.username}</p>
        </div>
        <div className={s.postCard__reaction}>
          <div>
            <ViewReaction reaction={reaction} likesCount={data.likesCount} />
          </div>
          {data.commentsCount && data.commentsCount > 0 ? (
            <div className={s.postCard__replies}>
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
    // For some reason, doesnt fetch comments with next/link.
    <a href={`/post/${data.id}`}>
      <article
        className={s.postCard}
        itemScope
        itemType="https://schema.org/Article"
      >
        {commonContent}
      </article>
    </a>
  );
};

export default PostCard;

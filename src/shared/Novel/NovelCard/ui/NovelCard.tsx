import { INovel } from '@/shared/common/model';
import { Reactions } from '@/shared/Reactions/lib/types';
import animateSwap from '@/shared/common/lib/utils/animateSwap';

import { ViewReaction } from '@/shared/Reactions';

import './NovelCard.scss';

export interface INovelCardAttrs {
  novel: INovel;
  reaction: Reactions;
}

// Card component for marketplace novels.
export default function NovelCard({ novel, reaction }: INovelCardAttrs) {
  const imgURL = `${process.env.NEXT_PUBLIC_ASSETS}/static/cover/novel/${novel.id}?v=${novel.coverVersion}`;
  const { id, genre, likesCount, commentsCount, author } = novel;

  let { title = ' ', description = ' ' } = novel;

  // Cutting overflow in title.
  if (title.length > 32) {
    title = title.slice(0, 32);
    title += '...';
  }

  // Cutting overflow in description.
  if (description.length > 92) {
    description = description.slice(0, 92);
    description += '...';
  }

  // SORRY DIDNT HAVE TIME FOR INSERTIN THOSE TYPES.
  function mouseEnterHandler(e: any) {
    if (!imgURL) {
      return;
    }

    animateSwap(e.currentTarget.children[0], e.currentTarget.children[1], 'block', 450);
  }

  function mouseLeaveHandler(e: any) {
    if (!imgURL) {
      return;
    }

    animateSwap(e.currentTarget.children[1], e.currentTarget.children[0], 'unset', 450);
    // const card = e.currentTarget.children[0];
    // card.style.display = 'unset';

    // const description = e.currentTarget.children[1];
    // description.style.display = 'none';
  }

  return (
    // For some reason, doesnt fetch comments with next/link.
    <a href={`/novel/${id}`} style={{ textDecoration: 'none' }}>
      <article
        className="novelArticle"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        itemScope
        itemType="https://schema.org/Game"
      >
        {imgURL ? (
          <img src={`${imgURL}`} alt={`История "${title}"`} className="novelImg" itemProp="image" />
        ) : (
          <div />
        )}
        <p
          style={{ display: imgURL ? 'none' : 'unset' }}
          className="cardDescription"
          itemProp="description"
        >
          {description}
          {author.username && (
            <span className="cardDescriptionAuthor">
              <br />
              {author.username}
            </span>
          )}
        </p>
        <h3 itemProp="name">{title}</h3>
        <p className="novelGenre" itemProp="genre">
          {genre}
        </p>
        <div className="novelStatsDiv">
          {!likesCount && !commentsCount ? (
            <div>
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.366)' }}>Пока нет оценок</p>
            </div>
          ) : (
            <div />
          )}
          <div>
            <ViewReaction reaction={reaction} likesCount={likesCount} />
          </div>
          {commentsCount && commentsCount > 0 ? (
            <div>
              <img src="/icons/replywhite.png" alt="replies" />
              <p itemProp="reviewCount">{commentsCount}</p>
            </div>
          ) : (
            <div />
          )}
        </div>
      </article>
    </a>
  );
}

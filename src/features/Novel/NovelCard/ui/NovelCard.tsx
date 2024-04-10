import React from 'react';

import Link from 'next/link';
import { ViewReaction } from '@/shared/Reactions';

import { INovel } from '@/shared/common/model';
import { Reactions } from '@/shared/Reactions/lib/types';

import './NovelCard.scss';

interface INovelCardAttrs {
  novel: INovel;
  reaction: Reactions;
}

// Card component for marketplace novels.
export default function NovelCard({ novel, reaction }: INovelCardAttrs) {
  const imgURL = `${process.env.NEXT_PUBLIC_BACKEND}/static/cover/novel/${novel.id}?v=${novel.coverVersion}`;
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

  // Mouse handlers.
  function mouseEnterHandler(e: { currentTarget: HTMLElement }) {
    if (!imgURL) {
      return;
    }

    const card = e.currentTarget.children[0];
    (card as HTMLElement).style.display = 'none';

    const description = e.currentTarget.children[1];
    (description as HTMLElement).style.display = 'block';
  }

  function mouseLeaveHandler(e: { currentTarget: HTMLElement }) {
    if (!imgURL || !e.currentTarget) {
      return;
    }

    const card = e.currentTarget.children[0];
    (card as HTMLElement).style.display = 'unset';

    const description = e.currentTarget.children[1];
    (description as HTMLElement).style.display = 'none';
  }

  return (
    <Link href={`/novel?id=${id}`} style={{ textDecoration: 'none' }}>
      <article
        className="novelArticle"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        itemScope
        itemType="https://schema.org/Product"
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
        <p className="novelGenre" itemProp="category">
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
              <p>{commentsCount}</p>
            </div>
          ) : (
            <div />
          )}
        </div>
      </article>
    </Link>
  );
}
